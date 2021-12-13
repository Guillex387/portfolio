import { VercelRequest, VercelResponse } from '@vercel/node';

export default (req: VercelRequest, res: VercelResponse) => {
  res.send('Welcome to the Guillex387 portfolio API 👨‍💻');
};
