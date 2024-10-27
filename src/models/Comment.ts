// models/Comment.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig';

class Comment extends Model {}

Comment.init({
  postId: { type: DataTypes.INTEGER, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
}, { sequelize, modelName: 'Comment' });

export default Comment;
