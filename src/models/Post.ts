// models/Post.ts
import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/dbConfig';
import User from './User';

interface PostAttributes {
  id: number;
  userId: number;
  title: string;
  content: string;
  musicFileUrl: string;
  likesCount: number;
  repostCount: number;
}

interface PostCreationAttributes extends Optional<PostAttributes, 'id'> {}

class Post extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {
  public id!: number;
  public userId!: number;
  public content!: string;
  public musicFileUrl!: string;
  public likesCount!: number;
  public repostCount!: number;
  public title!: string;

  // Timestamp attributes
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Post.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    musicFileUrl: { type: DataTypes.STRING, allowNull: false },
    likesCount: { type: DataTypes.INTEGER, defaultValue: 0 },
    repostCount: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  { sequelize, modelName: 'Post' }
);

// Associations
Post.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Post, { foreignKey: 'userId' });

export default Post;
