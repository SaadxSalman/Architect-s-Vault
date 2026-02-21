import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const products = [
    {
      name: "Amoxicillin 500mg",
      category: "Prescription Required",
      price: 15.99,
      isPrescriptionRequired: true,
      stock: 100,
    },
    {
      name: "Digital Blood Pressure Monitor",
      category: "Medical Equipment",
      price: 45.00,
      isPrescriptionRequired: false,
      stock: 50,
    },
    {
      name: "Ibuprofen 200mg (Advil)",
      category: "Over the Counter",
      price: 8.50,
      isPrescriptionRequired: false,
      stock: 200,
    },
    {
      name: "N95 Surgical Masks (50 Pack)",
      category: "Medical Equipment",
      price: 25.00,
      isPrescriptionRequired: false,
      stock: 500,
    }
  ]

  console.log('--- Seeding Medical Products ---')
  for (const p of products) {
    await prisma.product.create({ data: p })
  }
  console.log('✅ Seed successful!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })