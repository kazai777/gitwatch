# GitWatch

![](https://img.shields.io/github/stars/pandao/editor.md.svg) ![](https://img.shields.io/github/forks/pandao/editor.md.svg) ![](https://img.shields.io/github/tag/pandao/editor.md.svg) ![](https://img.shields.io/github/release/pandao/editor.md.svg) ![](https://img.shields.io/github/issues/pandao/editor.md.svg) ![](https://img.shields.io/bower/v/editor.md.svg)


The GitWatch project is an opensource project whose aim is to list all open-source projects available on GitHub, filtering them by category, language and popularity.


###TODO
---

- [ ] Add more search filters
- [ ] Add a graph of the most popular languages on GitHub
- [ ] Add a tutorial for open source beginners
- [ ] Add the most popular repos of the moment
...

### Getting Started
---
###### *Clone this project :*

``git clone https://github.com/kazai777/gitwatch``

###### *Install dependencies :*

``npm install``

###### *Add GitHub token :*

Create `.env.local` file in the root directory

Add this line in `.env.local` file, replacing `yourgithubtoken` with your token :

``GITHUB_TOKEN=yourgithubtoken``

###### *Launch the project :*

``npm run dev``