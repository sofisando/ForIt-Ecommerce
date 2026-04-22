import { prisma } from './lib/prisma.js'

async function main() {
    // acordarse de activar el servicio de postgres antes de ejecutar el test "sudo systemctl start postgresql"
    // ejecutar con: npm run test:db
    //recordar cambiar los datos cada vez que se quiera hacer la prueba para no tener conflictos de email unico
    
    // const newUser = await prisma.user.create({
    //     data: {
    //         name: "pablitoLescano",
    //         DNI: "123405677",
    //         email: "PablitoLescanito@gmail.com",
    //         password: "recontraSecret",
    //         role: "ADMIN"
    //     }
    // })
    // console.log(newUser)

    // const newCategory = await prisma.category.create({
    //     data: {
    //         name: "Categoria de prueba",
    //         products: {}
    //     }
    // })
    // console.log(newCategory)

    const newProduct = await prisma.product.create({
        data: {
            name: "Producto de prueba",
            description: "Este es un producto de prueba",
            imageUrl: "example.png",
            price: 1500.00,
            categoryId: "bbf7349c-f0a5-43f6-bd7e-d752c8839712",
        }
    })
    console.log(newProduct)
}

main()