import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/dbConfig';
import User from './User';
import Post from './Post';

class Repost extends Model {
  public id!: number;
  public userId!: number;
  public originalPostId!: number;
}

Repost.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' } },
  originalPostId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Post, key: 'id' } },
}, {
  sequelize,
  modelName: 'Repost',
});

export default Repost;
