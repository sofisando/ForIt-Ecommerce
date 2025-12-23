import { prisma } from './lib/prisma.js'

async function main() {
    const newUser = await prisma.user.create({
        data: {
            name: "Humberto",
            DNI: "123455677",
            email: "humberti@gmail.com",
            password: "reSecret",
            role: "ADMIN"
        }
    })
    console.log(newUser)
}

main()