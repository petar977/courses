const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
    try{
        await database.category.createMany({
            data: [
                { name: "Computer science" },
                { name: "Music" },
                { name: "Fitness" },
                { name: "Photography" },
                { name: "Accouting" },
                { name: "Engineering" },
                { name: "Filming" },
            ]
        });
        console.log("Success");
    } catch (error) {
        console.log("Error seeding the database categories");
    } finally {
        await database.$disconnect();
    }
} 

main();