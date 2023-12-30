import dotENV from 'dotenv';
dotENV.config();

const config = {
    port: process.env.PORT || 3001,
    dbURL: process.env.DB_URL,
    secretKey: process.env.SECRET_KEY,

}

export default config;