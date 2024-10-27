// seed.ts
import sequelize from './src/config/dbConfig'; // Убедитесь, что путь корректен
import Post from './src/models/Post'; // Убедитесь, что путь корректен
import Track from './src/models/Track'; // Убедитесь, что путь корректен

async function seedDatabase() {
  try {
    // Синхронизация с базой данных
    await sequelize.sync({ force: true });

    // Создаем посты
    const posts = await Post.bulkCreate([
    { title: 'Gothic Vibes', content: 'Dark, atmospheric beats.', musicFileUrl:'', likesCount: 10,repostCount: 0 ,userId:1},
      { title: 'Summer Chill', content: 'Smooth tunes for relaxing evenings.', musicFileUrl:'' ,likesCount: 20 ,repostCount: 0, userId:2},
      { title: 'Night Runner', content: 'Pumping beats for night drives.', musicFileUrl:'' ,likesCount: 15 ,repostCount: 0 ,userId:3},
      { title: 'Sunrise Meditation', content: 'Melodic and calm for early mornings.',musicFileUrl:'' , likesCount: 30,repostCount: 0 ,userId:4 }
    ]);

    // Добавляем треки к постам
    await Track.bulkCreate([
      { postId: posts[0].id, url: 'https://example.com/gothic-vibes.mp3' },
      { postId: posts[1].id, url: 'https://example.com/summer-chill.mp3' },
      { postId: posts[2].id, url: 'https://example.com/night-runner.mp3' },
      { postId: posts[3].id, url: 'https://example.com/sunrise-meditation.mp3' },
    ]);

    console.log('Посты и треки добавлены успешно!');
  } catch (error) {
    console.error('Ошибка при добавлении постов и треков:', error);
  }
}

// Запускаем функцию
seedDatabase();
