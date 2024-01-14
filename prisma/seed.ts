import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

const productData = [
    {
        categoryName: 'Hambúrgueres',
        products: [
            {
                name: 'CHEESE SALADA',
                description: 'Delicioso pão brioche com blend de 150g na churrasqueira, queijo cheddar, picles, cebola em rodelas, tomate e alface picado, tudo coberto com nosso molho especial da casa.',
                price: 'R$20.99',
                imageUrl: 'https://via.placeholder.com/100'
            },
            {
                name: 'CHEESE BACON',
                description: 'Irresistível blend de 150g feito na churrasqueira, queijo cheddar, fatias de bacon e nosso molho especial da casa, tudo envolto em nosso suculento pão brioche com gergelim.',
                price: 'R$22.99',
                imageUrl: 'https://via.placeholder.com/100'
            },
            {
                name: 'SMASH BURGUER',
                description: 'Nosso pão brioche liso com um smash de 80g grelhado com cebola temperada, queijo cheddar fatiado e molho especial da casa.',
                price: 'R$18.99',
                imageUrl: 'https://via.placeholder.com/100'
            },
            {
                name: 'VEGGIE BURGER',
                description: 'Delicioso hambúrguer vegetariano com vegetais frescos, queijo derretido e molho especial em pão integral.',
                price: 'R$16.99',
                imageUrl: 'https://via.placeholder.com/100'
            },
            {
                name: 'BBQ CHICKEN BURGER',
                description: 'Saboroso hambúrguer de frango grelhado com molho barbecue, queijo, alface e tomate em pão de hambúrguer tradicional.',
                price: 'R$24.99',
                imageUrl: 'https://via.placeholder.com/100'
            },
        ]
    },
    {
        categoryName: 'Bebidas',
        products: [
            {
                name: 'Coca-Cola 600ml',
                description: 'Aproveite uma garrafa de 600ml de Coca-Cola para acompanhar sua refeição.',
                price: 'R$8.99',
                imageUrl: 'https://via.placeholder.com/100'
            },
            {
                name: 'Coca-Cola 2 litros',
                description: 'Incremente com uma garrafa maior de 2 litros de Coca-Cola para compartilhar ou se deliciar.',
                price: 'R$24.99',
                imageUrl: 'https://via.placeholder.com/100'
            },
        ]
    },
    {
        categoryName: 'Batatas Fritas',
        products: [
            {
                name: 'Batatas Fritas Tradicionais',
                description: 'Experimente nossas deliciosas batatas fritas tradicionais, crocantes por fora e macias por dentro.',
                price: 'R$9.99',
                imageUrl: 'https://via.placeholder.com/100'
            },
        ]
    }
];

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

    const storeType = await prisma.storeType.create({
        data: {
            name: 'Hamburgueria',
        }
    });

    const store = await prisma.store.create({
        data: {
            name: 'Bisgo Burger',
            user_id: user.id,
            type_id: storeType.id,
        }
    });

    for (const category of productData) {
        // Create category
        const productCategory = await prisma.category.create({
            data: {
                name: category.categoryName,
                store_id: store.id,
            }
        });

        for (const product of category.products) {
            // Create product
            await prisma.product.create({
                data: {
                    name: product.name,
                    description: product.description,
                    category_id: productCategory.id,
                }
            });
        }
    }

    console.log('Seed finished');
}

main().then(async () => {
    await prisma.$disconnect();
}).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});