# GitWatch

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

The GitWatch project is an opensource project whose aim is to list all open-source projects available on GitHub, filtering them by category, language and popularity.


### Getting Started
---
###### *Clone this project :*

```go
git clone https://github.com/kazai777/gitwatch
```

###### *Install dependencies :*

```go
npm install
```

###### *Create a GitHub token :*
Go to `Settings` > `Developer settings` > `Personal access tokens` > `Generate new token`

###### *Add GitHub token :*

Create `.env.local` file in the root directory

Add this line in `.env.local` file, replacing `yourgithubtoken` with your token :

```go
GITHUB_TOKEN=yourgithubtoken
```


###### *Launch the project :*

```go
npm run dev
```

### TODO
---

- [ ] Add more search filters
- [ ] Add a graph of the most popular languages on GitHub
- [ ] Add a tutorial for open source beginners
- [ ] Add the most popular repos of the moment
...

## Authors

- [@kazai777](https://www.github.com/kazai777)

## Contributors

- [@DIGIX666](https://www.github.com/DIGIX666)