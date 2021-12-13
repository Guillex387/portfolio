import { VercelRequest, VercelResponse } from '@vercel/node';

export function cors(res: VercelResponse) {
  return res.setHeader('Access-Control-Allow-Origin', '*');
}

export default (req: VercelRequest, res: VercelResponse) => {
  cors(res).send('Welcome to the Guillex387 portfolio API 👨‍💻');
};
