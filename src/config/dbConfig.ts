import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize('mydatabase', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

export default sequelize;
