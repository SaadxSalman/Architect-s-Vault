import { initTRPC, TRPCError } from '@trpc/server';
import { z } from 'zod';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { Context } from './context';

const t = initTRPC.context<Context>().create();

const OrderStatusEnum = z.enum([
  'Pending', 
  'Processing', 
  'Shipped', 
  'Delivered', 
  'Requested Return', 
  'Refunded'
]);

export const appRouter = t.router({
  /**
   * 1. Fetch Inventory with Warehouse Joins
   */
  getInventory: t.procedure.query(async ({ ctx }) => {
    const { data, error } = await ctx.supabase
      .from('inventory')
      .select(`
        id, 
        sku, 
        name, 
        stock_level, 
        low_stock_threshold,
        warehouses (name, location_code)
      `);
    
    if (error) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: error.message });
    return data;
  }),

  /**
   * 2. Fetch Real Orders for the Dashboard
   */
  getOrders: t.procedure.query(async ({ ctx }) => {
    const { data, error } = await ctx.supabase
      .from('orders')
      .select(`
        *,
        warehouses (name)
      `)
      .order('created_at', { ascending: false });

    if (error) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: error.message });
    return data;
  }),

  /**
   * 3. Update Status & Generate PDF
   */
  updateOrderStatus: t.procedure
    .input(z.object({ 
      orderId: z.string().uuid(), 
      status: OrderStatusEnum 
    }))
    .mutation(async ({ input, ctx }) => {
      // 1. Fetch order details for the PDF context
      const { data: order, error: fetchError } = await ctx.supabase
        .from('orders')
        .select('*, warehouses(name)')
        .eq('id', input.orderId)
        .single();

      if (fetchError || !order) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Order not found' });
      }

      // 2. Update status
      const { data: updatedOrder, error: updateError } = await ctx.supabase
        .from('orders')
        .update({ status: input.status })
        .eq('id', input.orderId)
        .select()
        .single();

      if (updateError) throw new TRPCError({ code: 'BAD_REQUEST', message: updateError.message });

      // 3. Trigger PDF if Shipped
      let labelUrl = null;
      if (input.status === 'Shipped') {
        const warehouseName = Array.isArray(order.warehouses) 
          ? order.warehouses[0]?.name 
          : (order.warehouses as any)?.name;
          
        await generateShippingLabel(updatedOrder, warehouseName || 'Main Warehouse');
        labelUrl = `http://localhost:4000/labels/Label-${updatedOrder.id}.pdf`;
      }

      return { ...updatedOrder, labelUrl };
    }),

  /**
   * 4. Create New Order
   */
  createOrder: t.procedure
    .input(z.object({
      customerName: z.string(),
      warehouseId: z.string().uuid(),
      amount: z.number(),
    }))
    .mutation(async ({ input, ctx }) => {
      const { data, error } = await ctx.supabase
        .from('orders')
        .insert({
          customer_name: input.customerName,
          warehouse_id: input.warehouseId,
          total_amount: input.amount,
          status: 'Pending'
        })
        .select()
        .single();

      if (error) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: error.message });
      return data;
    }),

  /**
   * 5. Inventory Webhook (Low Stock Alerts)
   */
  handleInventoryWebhook: t.procedure
    .input(z.object({
      record: z.object({
        sku: z.string(),
        stock_level: z.number(),
        low_stock_threshold: z.number(),
        name: z.string()
      })
    }))
    .mutation(async ({ input }) => {
      const { sku, stock_level, low_stock_threshold, name } = input.record;
      if (stock_level <= low_stock_threshold) {
        console.log(`🚨 [ALERT] Low stock: ${name} (${sku})`);
        return { alerted: true };
      }
      return { alerted: false };
    }),
});

/**
 * UTILITY: PDF Generation
 */
async function generateShippingLabel(order: any, warehouseName: string) {
  const doc = new PDFDocument({ size: 'LETTER', margin: 50 });
  const exportDir = path.join(process.cwd(), 'exports', 'labels');
  
  if (!fs.existsSync(exportDir)) fs.mkdirSync(exportDir, { recursive: true });

  const filePath = path.join(exportDir, `Label-${order.id}.pdf`);
  const stream = fs.createWriteStream(filePath);
  
  return new Promise((resolve, reject) => {
    doc.pipe(stream);
    
    // Header
    doc.rect(0, 0, 612, 100).fill('#1e293b');
    doc.fillColor('#ffffff').fontSize(25).text('SHIPPING MANIFEST', 50, 40);
    
    // Body
    doc.fillColor('#000000').fontSize(12).text(`Order Date: ${new Date().toLocaleDateString()}`, 50, 120);
    doc.text(`Order ID: ${order.id}`, 50, 140);
    doc.moveDown();
    doc.fontSize(16).text('Recipient Details:', { underline: true });
    doc.fontSize(12).text(`Customer: ${order.customer_name}`);
    doc.text(`Origin Warehouse: ${warehouseName}`);
    
    // Visual Barcode Mock
    doc.moveDown(4);
    doc.fontSize(8).text('SCAN FOR TRACKING', 50, 285);
    doc.rect(50, 300, 300, 50).stroke();
    for(let i=0; i<30; i++) {
        doc.rect(60 + (i*10), 310, Math.random() * 5, 30).fill('#000000');
    }
    
    doc.end();
    stream.on('finish', resolve);
    stream.on('error', reject);
    console.log(`✅ [OMS] PDF generated: ${filePath}`);
  });
}

export type AppRouter = typeof appRouter;