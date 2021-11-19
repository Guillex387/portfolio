import axios from 'axios';

export interface GithubRepo {
  description: string;
  github_url: string;
}
export interface GithubRelease {
  tag_name: string;
  published_at: string;
  assets: GithubAsset[];
}
export interface GithubAsset {
  name: string;
  size: number;
  download_count: number;
  browser_download_url: string;
}
export interface GithubUser {
  login: string;
  avatar_url: string;
}

export default class GithubAPI {
  async getUserInfo(nickname: string): Promise<GithubUser | null> {
    try {
      let { status, data } = await axios.get(`https://api.github.com/user/${nickname}`, {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`
        }
      });
      if (status !== 200) return null;
      return {
        login: data.login,
        avatar_url: data.avatar_url
      };
    } catch (error) {
      return null;
    }
  }
  async getRepo(repoName: string, owner: string): Promise<GithubRepo | null> {
    try {
      let { status, data } = await axios.get(`https://api.github.com/repos/${owner}/${repoName}`, {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`
        }
      });
      if (status !== 200) return null;
      return {
        description: data.description,
        github_url: data.html_url
      };
    } catch (error) {
      return null;
    }
  }
  async getReadme(repoName: string, owner: string): Promise<string | null> {
    try {
      let { status, data } = await axios.get(`https://api.github.com/repos/${owner}/${repoName}`, {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`
        }
      });
      if (status !== 200) return null;
      let deafaultBranch = data.default_branch;
      let readmeRes = await axios.get(`https://raw.githubusercontent.com/${owner}/${repoName}/${deafaultBranch}/README.md`);
      if (readmeRes.status !== 200) return null;
      return readmeRes.data as string;
    } catch (error) {
      return null;
    }
  }
  async getReleases(repoName: string, owner: string): Promise<GithubRelease[] | null> {
    try {
      let { status, data } = await axios.get(`https://api.github.com/repos/${owner}/${repoName}/releases`, {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`
        }
      });
      if (status !== 200) return null;
      let releases: GithubRelease[] = [];
      for (const release of data as any) {
        let assets: GithubAsset[] = [];
        for (const asset of release.assets) {
          assets.push({
            name: asset.name,
            size: asset.size,
            download_count: asset.download_count,
            browser_download_url: asset.browser_download_url
          });
        }
        releases.push({
          tag_name: release.tag_name,
          published_at: release.published_at,
          assets
        });
      }
      return releases;
    } catch (error) {
      return null;
    }
  }
  async getLastRelease(repoName: string, owner: string): Promise<GithubRelease | null> {
    let releases = await this.getReleases(repoName, owner);
    if (!releases) return null;
    return releases[0];
  }

  constructor() {}
}
