import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // 1. Create the Master Workspace
  const workspace = await prisma.workspace.upsert({
    where: { id: 'enterprise-main-01' },
    update: {},
    create: {
      id: 'enterprise-main-01',
      name: 'Nexus Enterprise',
      slug: 'enterprise-main',
    },
  })

  // 2. Create a Mock User
  const user = await prisma.user.upsert({
    where: { email: 'saad@nexus.com' },
    update: {},
    create: {
      name: 'Saad Salman',
      email: 'saad@nexus.com',
      workspaceId: workspace.id,
    },
  })

  // 3. Create initial Tasks
  await prisma.task.createMany({
    data: [
      {
        title: 'Initialize Nexus Core',
        status: 'DONE',
        priority: 'URGENT',
        workspaceId: workspace.id,
      },
      {
        title: 'Configure Socket.io Pulse',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        workspaceId: workspace.id,
      },
      {
        title: 'Implement Multi-tenant Logic',
        status: 'TODO',
        priority: 'MEDIUM',
        workspaceId: workspace.id,
      }
    ]
  })

  console.log('✅ Seeding complete: Workspace "enterprise-main-01" is ready.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })