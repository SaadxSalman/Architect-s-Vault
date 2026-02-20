"use client";
import React from 'react';
import { trpc } from '../utils/trpc';
import { 
  Package, 
  Truck, 
  AlertTriangle, 
  RefreshCcw, 
  Warehouse,
  Loader2,
  ExternalLink
} from 'lucide-react';

export default function OMSDashboard() {
  // 1. Fetch Live Data
  const { data: inventory, isLoading: invLoading } = trpc.getInventory.useQuery();
  const { data: orders, isLoading: ordersLoading } = trpc.getOrders.useQuery();
  
  const utils = trpc.useUtils();

  // 2. Mutation with Auto-Download/Open Logic
  const updateStatus = trpc.updateOrderStatus.useMutation({
    onSuccess: (data) => {
      utils.getInventory.invalidate();
      utils.getOrders.invalidate();
      
      // If a label URL was returned (on Shipped), open it in a new tab
      if (data?.labelUrl) {
        window.open(data.labelUrl, '_blank');
      }
    },
    onError: (err) => alert(`Error: ${err.message}`)
  });

  const handleShip = (id: string) => {
    updateStatus.mutate({ orderId: id, status: 'Shipped' });
  };

  const handleRefund = (id: string) => {
    updateStatus.mutate({ orderId: id, status: 'Refunded' });
  };

  // Helper calculations
  const totalStock = inventory?.reduce((acc, item) => acc + (item.stock_level || 0), 0) || 0;
  const lowStockCount = inventory?.filter(item => item.stock_level <= item.low_stock_threshold).length || 0;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Enterprise <span className="text-blue-500">OMS</span>
          </h1>
          <p className="text-slate-400 mt-1">Fulfillment & Multi-Warehouse Command Center</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
            <Warehouse size={18} className="text-blue-400" />
            <span className="text-sm font-medium">Nodes: {invLoading ? '...' : 'Active'}</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Stock" value={totalStock.toLocaleString()} icon={<Package className="text-blue-400" />} />
        <StatCard title="Outbound Today" value={orders?.filter(o => o.status === 'Shipped').length.toString() || "0"} icon={<Truck className="text-green-400" />} />
        <StatCard title="Returns" value="3" icon={<RefreshCcw className="text-orange-400" />} />
        
        <div className={`p-4 rounded-xl flex items-center gap-4 border ${
          lowStockCount > 0 ? 'bg-red-500/10 border-red-500/50' : 'bg-slate-900 border-slate-800'
        }`}>
          <AlertTriangle className={lowStockCount > 0 ? "text-red-500" : "text-slate-500"} size={24} />
          <div>
            <p className={`text-xs uppercase font-bold ${lowStockCount > 0 ? "text-red-400" : "text-slate-500"}`}>Low Stock Alert</p>
            <p className="text-xl font-mono text-white">{lowStockCount} SKUs</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Inventory Column */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2 text-slate-200">
            <Package size={20} className="text-blue-500" /> Live Inventory
          </h2>
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden min-h-[400px]">
            {invLoading ? (
              <div className="p-20 flex flex-col items-center gap-3 text-slate-500"><Loader2 className="animate-spin" size={32} /></div>
            ) : inventory?.map((item: any) => {
                const warehouseData = Array.isArray(item.warehouses) ? item.warehouses[0] : item.warehouses;
                return (
                  <div key={item.id} className="p-4 border-b border-slate-800 last:border-0 hover:bg-slate-800/40 transition">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-slate-200">{item.name}</p>
                        <p className="text-xs text-slate-500 uppercase font-mono">{item.sku}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded font-bold font-mono ${item.stock_level <= item.low_stock_threshold ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                        QTY: {item.stock_level}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-2 flex items-center gap-1.5">
                      <Warehouse size={12} /> {warehouseData?.name || 'Unassigned'}
                    </p>
                  </div>
                );
            })}
          </div>
        </div>

        {/* Orders Column */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2 text-slate-200">
            <Truck size={20} className="text-blue-500" /> Fulfillment Queue
          </h2>
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="p-4">Customer</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Warehouse</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {ordersLoading ? (
                   <tr><td colSpan={4} className="p-10 text-center"><Loader2 className="animate-spin mx-auto" /></td></tr>
                ) : orders?.map((order: any) => (
                  <tr key={order.id} className="group hover:bg-slate-800/20 transition">
                    <td className="p-4">
                      <p className="font-medium text-slate-200">{order.customer_name}</p>
                      <p className="text-xs text-slate-500 font-mono">ID: {order.id.split('-')[0]}...</p>
                    </td>
                    <td className="p-4"><StatusBadge status={order.status} /></td>
                    <td className="p-4 text-sm text-slate-400">
                        {Array.isArray(order.warehouses) ? order.warehouses[0]?.name : order.warehouses?.name || 'N/A'}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      {order.status !== 'Shipped' && order.status !== 'Refunded' ? (
                        <>
                          <button 
                            onClick={() => handleShip(order.id)}
                            disabled={updateStatus.isLoading}
                            className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1.5 rounded-md font-bold transition disabled:opacity-50"
                          >
                            {updateStatus.isLoading ? '...' : 'SHIP ITEM'}
                          </button>
                          <button onClick={() => handleRefund(order.id)} className="text-slate-400 hover:text-red-400 text-xs transition font-medium">Refund</button>
                        </>
                      ) : (
                        order.status === 'Shipped' && (
                          <button 
                            onClick={() => window.open(`http://localhost:4000/labels/Label-${order.id}.pdf`, '_blank')}
                            className="text-blue-400 hover:text-blue-300 text-xs flex items-center gap-1 ml-auto"
                          >
                            <ExternalLink size={12} /> REPRINT LABEL
                          </button>
                        )
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-components
function StatCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
      <div className="flex justify-between items-start mb-2">
        <p className="text-slate-400 text-sm font-medium">{title}</p>
        {icon}
      </div>
      <p className="text-3xl font-mono font-bold tracking-tight text-white">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    'Pending': 'bg-slate-700 text-slate-300',
    'Processing': 'bg-blue-500/20 text-blue-400 border border-blue-500/20',
    'Shipped': 'bg-purple-500/20 text-purple-400 border border-purple-500/20',
    'Delivered': 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20',
    'Refunded': 'bg-red-500/20 text-red-400 border border-red-500/20',
  };
  return <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${styles[status] || styles['Pending']}`}>{status}</span>;
}