
import express from 'express';
import routes from './routes';
import connect from './db/connection';
import config from './utils/config';
import cors from 'cors'
const app = express();
const PORT = config.port;

connect();
app.use(express.json());
app.use(cors()); 
app.use("/api/", routes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
