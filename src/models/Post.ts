// models/Post.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/dbConfig';

class Post extends Model {
  public id!: number;
  public title!: string;
  public content!: string;
  public likes!: number;
}

Post.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    likes: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  {
    sequelize,
    modelName: 'Post',
  }
);

export default Post;
