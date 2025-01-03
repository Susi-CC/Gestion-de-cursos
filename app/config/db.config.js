import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
config();

const {USER,HOST,DATABASE,PASSWORD,PORT} = process.env;

const db = new Sequelize(
    DATABASE,
    USER,
    PASSWORD,
    {
        host: HOST,
        port: PORT,
        dialect: 'postgres'
    }
);
export default db;
console.log('Configuración de conexión:', {
    USER: process.env.USER,
    HOST: process.env.HOST,
    DATABASE: process.env.DATABASE,
    PASSWORD: process.env.PASSWORD,
    PORT: process.env.PORT,
});

