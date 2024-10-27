import { startApp } from './app';

const PORT = process.env.PORT || 5000;

startApp().then(app => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Failed to start the server:', error);
});
