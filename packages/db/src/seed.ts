import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create Users
  const admin = await prisma.user.create({
    data: {
      id: '0d6348db-a227-493e-b5ad-16992d2cc5ab',
      name: 'Admin User',
      email: 'admin@example.com',
      emailVerified: true,
    },
  });

  const user1 = await prisma.user.create({
    data: {
      id: '1a2b3c4d-5678-9101-1121-314151617181',
      name: 'John Doe',
      email: 'john@example.com',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      id: '2b3c4d5e-6789-1011-1213-141516171819',
      name: 'Jane Smith',
      email: 'jane@example.com',
    },
  });

  // Create Rooms
  const room1 = await prisma.room.create({
    data: {
      slug: 'general-room',
      adminId: admin.id,
    },
  });

  const room2 = await prisma.room.create({
    data: {
      slug: 'random-room',
      adminId: admin.id,
    },
  });

  // Create Chats
  await prisma.chat.createMany({
    data: [
      {
        roomId: room1.id,
        userId: admin.id,
        message: 'Welcome to the general room!',
      },
      {
        roomId: room1.id,
        userId: user1.id,
        message: 'Hello everyone!',
      },
      {
        roomId: room1.id,
        userId: user2.id,
        message: 'Hi John!',
      },
      {
        roomId: room2.id,
        userId: admin.id,
        message: 'This is a random room.',
      },
    ],
  });

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
