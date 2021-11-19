import { Router } from 'express';
import NotionAPI from '../lib/db';
import GithubAPI from '../lib/github';

const router = Router();
const githubAPI = new GithubAPI();
const notionAPI = new NotionAPI();

router.get('/', async (req, res) => {
  let dbPrograms = await notionAPI.getPrograms();
  let filter = req.query.released;
  if (filter === 'true') {
    dbPrograms = dbPrograms.filter(item => item.released);
  } else if (filter === 'false') {
    dbPrograms = dbPrograms.filter(item => !item.released);
  }
  let formattedPrograms = [];
  for (const dbProgram of dbPrograms) {
    if (dbProgram['repo-name']) {
      let repo = await githubAPI.getRepo(dbProgram['repo-name'], dbProgram.owner);
      if (!repo) formattedPrograms.push(dbProgram);
      else
        formattedPrograms.push({
          ...dbProgram,
          github_url: repo.github_url,
          description: repo.description
        });
    } else formattedPrograms.push(dbProgram);
  }
  res.json(formattedPrograms);
});

export default router;
