import mongoose from 'mongoose';
import config from '../utils/config';

const connect = ()=>{
    try {
        mongoose.set('strictQuery', true);
        mongoose.connect(config.dbURL as string).then(()=>console.log("DataBase Connected Successfully")
        ).catch(()=>console.log("Unable to connect with DataBase"))
    } catch (error) {
        console.log("Unable to connect with DataBase");
        
    }
}

export default connect;