const { PrismaClient, Role, TransactionType } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Clean existing data
  await prisma.transaction.deleteMany();
  await prisma.checkIn.deleteMany();
  await prisma.user.deleteMany();
  await prisma.plan.deleteMany();

  // Create Plans
  const basicPlan = await prisma.plan.create({
    data: {
      name: 'Plan Básico',
      priceCents: 2999, // $29.99
      durationDays: 30,
      description: 'Acceso básico al gimnasio durante 30 días',
      features: ['Acceso al área de pesas', 'Acceso al área de cardio', 'Casillero incluido'],
      active: true,
    },
  });

  const premiumPlan = await prisma.plan.create({
    data: {
      name: 'Plan Premium',
      priceCents: 4999, // $49.99
      durationDays: 30,
      description: 'Acceso completo con clases grupales',
      features: [
        'Todo lo del Plan Básico',
        'Clases grupales ilimitadas',
        'Acceso a la sauna',
        'Nutricionista incluido',
      ],
      active: true,
    },
  });

  const vipPlan = await prisma.plan.create({
    data: {
      name: 'Plan VIP',
      priceCents: 7999, // $79.99
      durationDays: 30,
      description: 'Acceso VIP con entrenador personal',
      features: [
        'Todo lo del Plan Premium',
        '2 sesiones de entrenamiento personal',
        'Acceso 24/7',
        'Área VIP exclusiva',
      ],
      active: true,
    },
  });

  console.log('✅ Plans created');

  // Create Admin User
  const adminPassword = await bcrypt.hash('admin123', 10);
  const adminUser = await prisma.user.create({
    data: {
      name: 'Administrador',
      email: 'admin@gymcontrol.com',
      password: adminPassword,
      role: Role.ADMIN,
      phone: '+1234567890',
      active: true,
    },
  });

  // Create Staff User
  const staffPassword = await bcrypt.hash('staff123', 10);
  const staffUser = await prisma.user.create({
    data: {
      name: 'Staff Member',
      email: 'staff@gymcontrol.com',
      password: staffPassword,
      role: Role.STAFF,
      phone: '+1234567891',
      active: true,
    },
  });

  // Create Regular Users
  const users = [];
  const userPassword = await bcrypt.hash('user123', 10);
  
  for (let i = 1; i <= 10; i++) {
    const user = await prisma.user.create({
      data: {
        name: `Usuario ${i}`,
        email: `user${i}@gmail.com`,
        password: userPassword,
        role: Role.USER,
        phone: `+123456789${i}`,
        address: `Dirección ${i}, Ciudad`,
        birthDate: new Date(1990 + (i % 20), (i % 12), (i % 28) + 1),
        active: true,
        planId: i % 3 === 0 ? basicPlan.id : i % 3 === 1 ? premiumPlan.id : vipPlan.id,
        membershipStartDate: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)),
        membershipEndDate: new Date(Date.now() + (30 - i) * 24 * 60 * 60 * 1000),
      },
    });
    users.push(user);
  }

  console.log('✅ Users created');

  // Create Check-ins (last 7 days)
  for (let day = 0; day < 7; day++) {
    const date = new Date();
    date.setDate(date.getDate() - day);
    
    // Random number of check-ins per day (5-15)
    const checkInsCount = Math.floor(Math.random() * 10) + 5;
    
    for (let i = 0; i < checkInsCount; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomHour = Math.floor(Math.random() * 12) + 6; // 6 AM to 6 PM
      const checkInDate = new Date(date);
      checkInDate.setHours(randomHour, Math.floor(Math.random() * 60));
      
      await prisma.checkIn.create({
        data: {
          userId: randomUser.id,
          at: checkInDate,
          method: Math.random() > 0.5 ? 'CARD' : 'APP',
        },
      });
    }
  }

  console.log('✅ Check-ins created');

  // Create Transactions (last 30 days)
  for (let day = 0; day < 30; day++) {
    const date = new Date();
    date.setDate(date.getDate() - day);
    
    // Random number of transactions per day (1-5)
    const transactionsCount = Math.floor(Math.random() * 5) + 1;
    
    for (let i = 0; i < transactionsCount; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const plans = [basicPlan, premiumPlan, vipPlan];
      const randomPlan = plans[Math.floor(Math.random() * plans.length)];
      
      const transactionDate = new Date(date);
      transactionDate.setHours(
        Math.floor(Math.random() * 14) + 8, // 8 AM to 10 PM
        Math.floor(Math.random() * 60)
      );
      
      await prisma.transaction.create({
        data: {
          amountCents: randomPlan.priceCents,
          currency: 'USD',
          type: TransactionType.PAYMENT,
          description: `Pago de ${randomPlan.name}`,
          userId: randomUser.id,
          createdAt: transactionDate,
        },
      });
    }
  }

  // Add some refunds
  for (let i = 0; i < 3; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const refundDate = new Date();
    refundDate.setDate(refundDate.getDate() - Math.floor(Math.random() * 15));
    
    await prisma.transaction.create({
      data: {
        amountCents: -2999, // Negative amount for refund
        currency: 'USD',
        type: TransactionType.REFUND,
        description: 'Reembolso por cancelación',
        userId: randomUser.id,
        createdAt: refundDate,
      },
    });
  }

  console.log('✅ Transactions created');

  console.log('🎉 Seed completed!');
  console.log('\n📝 Default credentials:');
  console.log('Admin: admin@gymcontrol.com / admin123');
  console.log('Staff: staff@gymcontrol.com / staff123');
  console.log('Users: user1@gmail.com to user10@gmail.com / user123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });