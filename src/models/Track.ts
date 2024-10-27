// models/Track.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/dbConfig';
import Post from './Post';

class Track extends Model {
  public id!: number;
  public postId!: number;
  public url!: string;
}

Track.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    postId: { type: DataTypes.INTEGER, references: { model: Post, key: 'id' }, allowNull: false },
    url: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: 'Track',
  }
);

// Устанавливаем связь между моделями
Post.hasMany(Track, { foreignKey: 'postId', as: 'tracks' });
Track.belongsTo(Post, { foreignKey: 'postId', as: 'post' });

export default Track;
