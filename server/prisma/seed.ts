import { prisma } from "../lib/prisma";

async function main(){

    const users = await Promise.all([
        prisma.user.create({
            data: {
                name: "João Victor",
                email: "jv@test.com",
                tasks: {
                    create: [{
                        title: "Fazer Monitoria",
                        description: "Montar código e repassar repo",
                        completed: false
                    },{
                        title: "Ler A Game of Thrones",
                        completed: true
                    }]
                }
            }
        }),
        prisma.user.create({
            data: {
                name: "Caio Boas",
                email: "cvb@test.com",
                tasks: {
                    create: [{
                        title: "Ferrari Campeã Mundial",
                        description: "ver a ferrari ganhar",
                        completed: false
                    },
                    {
                        title: "Passear com os Dogs",
                        completed: false
                    }]
                }
            }
        }),
        prisma.user.create({
            data: {
                name: "Vinicius Macedo",
                email: "vico@mac.com",
                tasks: {
                    create: [{
                        title: "Corrigir",
                        description: "Corrigir atividades",
                        completed: false
                    }]
                }
            }
        }),
        prisma.user.create({
            data: {
                name: "Gabriel Ayres",
                email: "gabs@org.com",
                tasks: {
                    create: [{
                        title: "Trabalhar",
                        description: "Parar com a ociosidade",
                    },
                    {
                        title: "Ver ele ganhar 5",
                        completed: false
                    }]
                }
            }
        }),
    ])

    console.log("Created users: ", users)
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
