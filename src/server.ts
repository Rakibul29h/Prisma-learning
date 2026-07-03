import { Prisma } from "@prisma/client/extension";
import app from "./app";
import config from "./config";

const PORT=config.port
async function main (){
    try {
        // await Prisma.$connect()
        app.listen(PORT,()=>{
            console.log(`Server is running on ${PORT}`);
        })
    } catch (error) {
        console.error("Error starting the server ",error)
        process.exit(1);
    }
}

main();