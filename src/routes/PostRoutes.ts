import express, { Request, Response, Router } from 'express';
import Post from '../models/Post';
import Like from '../models/Like';
import Comment from '../models/Comment'; 
import User from '../models/User';
const router = express.Router();

router.get('/posts', async (req: Request, res: Response) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: User, as: 'user', attributes: ['username'] }],
      attributes: ['id', 'title', 'content', 'musicFileUrl', 'likesCount', 'repostCount', 'createdAt']
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error); 
    res.status(500).json({ message: 'Internal Server Error',error});
  }
});

export default router;
