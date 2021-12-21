import { VercelRequest, VercelResponse } from '@vercel/node';
import cache, { updateCache } from '../../../../lib/cache';
import NotionAPI from '../../../../lib/db';
import GithubAPI from '../../../../lib/github';
import { cors } from '../../../index';

const githubAPI = new GithubAPI();
const notionAPI = new NotionAPI();

export default async (req: VercelRequest, res: VercelResponse) =>
  await cache(req, cors(res), async (req, res) => {
    let programName = req.query.name.toString();
    let program = await notionAPI.getProgram(programName);
    if (!program) return res.status(404).send('Program not found');
    if (program['repo-name']) {
      let releases = await githubAPI.getReleases(program['repo-name'], program.owner);
      if (!releases) return res.status(404).send('Github releases not found');
      await updateCache(req.url || 'null-route', releases);
      return res.json(releases);
    }
    return res.status(400).send('The program not have releases');
  });
