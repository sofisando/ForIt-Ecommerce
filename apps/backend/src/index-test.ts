import { prisma } from './lib/prisma.js'

async function main() {
    const newUser = await prisma.user.create({
        data: {
            // ejecutar con: npm run test:db
            //recordar cambiar los datos cada vez que se quiera hacer la prueba para no tener conflictos de email unico
            name: "PEpito",
            DNI: "123455677",
            email: "Pep2@gmail.com",
            password: "reSecret",
            role: "ADMIN"
        }
    })
    console.log(newUser)
}

main()