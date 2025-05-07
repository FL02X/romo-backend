import { PrismaClient, Role, DressStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  const passwordAdmin = await bcrypt.hash('admin', 10);
  const passwordStaff = await bcrypt.hash('staff', 10);

  // Crear usuarios
  const admin = await prisma.user.create({
    data: {
      email: 'admin',
      password: passwordAdmin,
      role: Role.ADMIN,
    },
  });

  const staff = await prisma.user.create({
    data: {
      email: 'staff',
      password: passwordStaff,
      role: Role.STAFF,
    },
  });

  // Crear vestidos
  const dresses = await Promise.all(
    Array.from({ length: 5 }).map(() =>
      prisma.dress.create({
        data: {
          name: faker.commerce.productName() + ' ' + faker.color.human(),
          size: faker.helpers.arrayElement(['XS', 'S', 'M', 'L', 'XL']),
          color: faker.color.human(),
          price: Number(faker.commerce.price({ min: 1000, max: 2000 })),
          rentalPrice: Number(faker.commerce.price({ min: 300, max: 600 })),
          status: faker.helpers.arrayElement([
            DressStatus.DISPONIBLE,
            DressStatus.RENTADO,
            DressStatus.VENDIDO,
          ]),
        },
      }),
    ),
  );

  const disponibles = dresses.filter((d) => d.status === 'DISPONIBLE');
  const rentados = dresses.filter((d) => d.status === 'RENTADO');
  const vendidos = dresses.filter((d) => d.status === 'VENDIDO');

  // Crear rentas
  if (rentados.length >= 1) {
    await prisma.rental.create({
      data: {
        clientName: faker.person.fullName(),
        startDate: faker.date.recent({ days: 10 }),
        endDate: faker.date.soon({ days: 5 }),
        price: rentados[0].rentalPrice,
        dressId: rentados[0].id,
        userId: staff.id,
      },
    });
  }

  if (disponibles.length >= 1) {
    await prisma.rental.create({
      data: {
        clientName: faker.person.fullName(),
        startDate: faker.date.recent({ days: 3 }),
        endDate: faker.date.soon({ days: 7 }),
        price: disponibles[0].rentalPrice,
        dressId: disponibles[0].id,
        userId: staff.id,
      },
    });
  }

  // Crear ventas
  if (vendidos.length >= 1) {
    await prisma.sale.create({
      data: {
        clientName: faker.person.fullName(),
        date: faker.date.recent({ days: 15 }),
        price: vendidos[0].price,
        dressId: vendidos[0].id,
        userId: admin.id,
      },
    });
  }

  if (disponibles.length >= 2) {
    await prisma.sale.create({
      data: {
        clientName: faker.person.fullName(),
        date: faker.date.recent({ days: 5 }),
        price: disponibles[1].price,
        dressId: disponibles[1].id,
        userId: staff.id,
      },
    });
  }

  console.log('✅ Finalizado seed...');
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
