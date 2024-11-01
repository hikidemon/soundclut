import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/dbConfig';

class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
  public role!: 'user' | 'admin';
}

User.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('user', 'admin'), defaultValue: 'user' },
}, {
  sequelize,
  modelName: 'User',
});

export default User;
