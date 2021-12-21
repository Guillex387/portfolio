import { VercelRequest, VercelResponse } from '@vercel/node';
import cache, { updateCache } from '../../../lib/cache';
import NotionAPI from '../../../lib/db';
import GithubAPI from '../../../lib/github';
import { cors } from '../../index';

const githubAPI = new GithubAPI();
const notionAPI = new NotionAPI();

export default async (req: VercelRequest, res: VercelResponse) =>
  await cache(req, cors(res), async (req, res) => {
    let programName = req.query.name.toString();
    let program = await notionAPI.getProgram(programName);
    if (!program) return res.status(404).send('Program not found');
    if (program['repo-name']) {
      let repo = await githubAPI.getRepo(program['repo-name'], program.owner);
      if (!repo) return res.status(404).send('Github repository not found');
      let readme = await githubAPI.getReadme(program['repo-name'], program.owner);
      if (!readme) return res.status(404).send('Readme of repository not found');
      await updateCache(req.url || 'null-route', { ...program, ...repo, readme });
      return res.json({ ...program, ...repo, readme });
    }
    await updateCache(req.url || 'null-route', program);
    return res.json(program);
  });
