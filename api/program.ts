import express from 'express';
import NotionAPI from '../lib/db';
import GithubAPI from '../lib/github';

const githubAPI = new GithubAPI();
const notionAPI = new NotionAPI();
const app = express();

app.get('/:name', async (req, res) => {
  let program = await notionAPI.getProgram(req.params.name);
  if (!program) return res.status(404).send('Program not found');
  if (program['repo-name']) {
    let repo = await githubAPI.getRepo(program['repo-name'], program.owner);
    if (!repo) return res.status(404).send('Github repository not found');
    let readme = await githubAPI.getReadme(program['repo-name'], program.owner);
    if (!readme) return res.status(404).send('Readme of repository not found');
    return res.json({ ...program, ...repo, readme });
  }
  return res.json(program);
});

app.get('/:name/releases', async (req, res) => {
  let program = await notionAPI.getProgram(req.params.name);
  if (!program) return res.status(404).send('Program not found');
  if (program['repo-name']) {
    let releases = await githubAPI.getReleases(program['repo-name'], program.owner);
    if (!releases) return res.status(404).send('Github releases not found');
    return res.json(releases);
  }
  return res.status(400).send('The program not have releases');
});

app.get('/:name/releases/last', async (req, res) => {
  let program = await notionAPI.getProgram(req.params.name);
  if (!program) return res.status(404).send('Program not found');
  if (program['repo-name']) {
    let release = await githubAPI.getLastRelease(program['repo-name'], program.owner);
    if (!release) return res.status(404).send('Github release not found');
    return res.json(release);
  }
  return res.status(400).send('The program has not releases');
});

export default app;
