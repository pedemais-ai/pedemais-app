import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data: {
            name: 'Alfredo Costa',
            email: 'alfredocosta@live.com',
        }
    });

    const flow = await prisma.flow.create({
        data: {
            name: 'default',
            greeting: 'Olá! Sou seu o Bisgo, o seu atendente virtual. Como posso te ajudar?',
        }
    });

    const client = await prisma.client.create({
        data: {
            name: 'Social Up',
            handle: 'social',
            is_authenticated: false,
            user_id: user.id,
            flow_id: flow.id,
        }
    });

    console.log('Seed finished');
}

main().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
});