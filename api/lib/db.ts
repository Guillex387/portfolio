import dotenv from 'dotenv';
import { Client } from '@notionhq/client';

dotenv.config();
const notionAPI = new Client({ auth: process.env.NOTION_TOKEN });

export interface ProgramDB {
  title: string;
  released: boolean;
  'repo-name'?: string;
  owner: string;
  description?: string;
  'release-date'?: string;
}
export default class NotionAPI {
  async getPrograms() {
    let { results } = await notionAPI.databases.query({
      database_id: process.env.NOTION_DATABASE as string
    });
    let programs: ProgramDB[] = [];
    for (const result of results) {
      const props: any = result.properties;
      if (props.released.checkbox) {
        programs.push({
          title: props.name.title[0].plain_text,
          released: true,
          'repo-name': props['repo-name'].rich_text[0].plain_text,
          owner: props.owner.rich_text[0].plain_text
        });
      } else {
        let repoName = props['repo-name'].rich_text.length !== 0;
        programs.push({
          title: props.name.title[0].plain_text,
          released: false,
          'repo-name': repoName ? props['repo-name'].rich_text[0].plain_text : undefined,
          owner: props.owner.rich_text[0].plain_text,
          description: props.description.rich_text[0].plain_text,
          'release-date': props['release-date'].date.start
        });
      }
    }
    return programs;
  }
  async getProgram(title: string): Promise<ProgramDB | undefined> {
    let programs = await this.getPrograms();
    return programs.find(item => item.title === title);
  }
  constructor() {}
}
