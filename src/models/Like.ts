// models/Like.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/dbConfig';
import User from './User';
import Post from './Post';

class Like extends Model {
  public id!: number;
  public userId!: number;
  public postId!: number;
}

Like.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: 'id' },
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Post, key: 'id' },
    },
  },
  {
    sequelize,
    modelName: 'Like',
    timestamps: false, // Если временные метки не нужны
    indexes: [{ unique: true, fields: ['userId', 'postId'] }],
  }
);

export default Like;
