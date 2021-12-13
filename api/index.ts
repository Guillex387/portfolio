import { VercelRequest, VercelResponse } from '@vercel/node';

export function cors(res: VercelResponse) {
  return res
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Credentials', 'true')
    .setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    .setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
}

export default (req: VercelRequest, res: VercelResponse) => {
  cors(res).send('Welcome to the Guillex387 portfolio API 👨‍💻');
};
