import mongoose from 'mongoose';


export async function connect(){
    try{
             mongoose.connect(process.env.MONGO_URL!)
             const connection = mongoose.connection

             connection.on('connected', () => {
                console.log('Mongodb connected')
             })

             connection.on('error', (err) => {
                console.log('Mongodb connection error, please make sure db is up and running' + err);
                process.exit();
             })
    }
    catch(error){
        console.log('Someting went wrong in db Connection');
        console.log(error);
    }
}