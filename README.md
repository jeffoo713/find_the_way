# Find The Way

## Contents

- [General info](#general-info)
- [Sample image](#preview)
- [Tech stack](#tech-stack)
- [Run the project](#run-the-project)

## General info

- Just to have fun with TS by creating a simple memory game :tada:
- You can choose a level depending on your confidence :rocket:

## Preview

![sameple-gif](https://github.com/jeffoo713/find_the_way/blob/master/client/sampel-video/play.gif)

![sameple-mobile](https://github.com/jeffoo713/find_the_way/blob/master/client/sampel-video/mobile.png)

![sameple-web1](https://github.com/jeffoo713/find_the_way/blob/master/client/sampel-video/level-selection-web.png)

![sameple-web2](https://github.com/jeffoo713/find_the_way/blob/master/client/sampel-video/complete-web.png)

## Tech stack

- Frontend development: TypeScript, React
- Deployment tools and envs: Docker-compose

\*\* Docker-compose is used to leave room for extending the project, like adding a server/DB etc.

## Run the project

1. Navigate into core directory

```sh
$ cd core
```

2. Build image

```sh
$ docker-compose build
```

3. Create and run container 

```sh
$ docker-compose -p find_the_way up -d
```

4. Check the project runningn on `http://localhost:3333/`
