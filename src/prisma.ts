import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

prisma.$extends({
    model: {},
});

export {prisma};
