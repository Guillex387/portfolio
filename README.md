# Guillex387 portfolio

This are my personal web portfolio, this are made with [nuxt.js](), [typescript]() and [tailwindCSS]().
For show my personal projects, skills and upcoming programs, this web app use notion API for storage basic data and github API for get the project details, version, ...

## Portfolio public API

- Programs **GET** `/api/programs`

  This gives you a list of my programs with some info about this.

  **Response:**

  ```json
  [
    {
      "title": "released_program",
      "released": true,
      "repo-name": "my_repo",
      "owner": "User1234",
      "github_url": "https://github.com/User1234/my_repo",
      "description": "Some of the project"
    },
    {
      "title": "unreleased_program",
      "released": false,
      "repo-name": "",
      "owner": "User1234",
      "description": "Some of the project",
      "release-date": "2023-11-21"
    }
  ]
  ```

- Program **GET** `/api/program/:name`

  This route gives you an specific info about the program.

  **Response:**

  ```json
  {
    "title": "released_program",
    "released": true,
    "repo-name": "my_repo",
    "owner": "User1234",
    "github_url": "https://github.com/User1234/my_repo",
    "description": "Some of the project",
    "readme": "# Some **github** readme" // This property doesn't exists if repo-name is equal to ""
  }
  ```

- Releases **GET** `/api/program/:name/releases`

  This route gives you the list of github releases of the program.

  **Response:**

  ```json
  [
    {
      "tag_name": "v2.3.0",
      "published_at": "2021-09-16T01:34:14Z",
      "assets": [
        {
          "name": "program.zip",
          "size": 7892010,
          "download_count": 23,
          "browser_download_url": "https://github.com/User1234/my_repo/releases/download/v2.3.0/program.zip"
        }
      ]
    },
    {
      "tag_name": "v1.6.0",
      "published_at": "2020-05-12T04:43:00Z",
      "assets": [
        {
          "name": "program.zip",
          "size": 3567345,
          "download_count": 54,
          "browser_download_url": "https://github.com/User1234/my_repo/releases/download/v1.6.0/program.zip"
        }
      ]
    }
  ]
  ```

- Last release **GET** `/api/program/:name/releases/last`

  This route gives you the last github release of the program.

  **Response:**

  ```json
  {
    "tag_name": "v2.3.0",
    "published_at": "2021-09-16T01:34:14Z",
    "assets": [
      {
        "name": "program.zip",
        "size": 7892010,
        "download_count": 23,
        "browser_download_url": "https://github.com/User1234/my_repo/releases/download/v2.3.0/program.zip"
      }
    ]
  }
  ```
