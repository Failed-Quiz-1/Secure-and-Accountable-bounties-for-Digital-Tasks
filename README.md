# Secure-and-Accountable-bounties-for-Digital-Tasks

![workflow status](https://github.com/Failed-Quiz-1/Secure-and-Accountable-bounties-for-Digital-Tasks/actions/workflows/docker-image.yml/badge.svg)

### Setup

Helps to install all necessary dependencies in all packages

```
yarn setup
```

### Start Local

Start both frontend react app and backend nestjs app

```
yarn start
```

### To run straight from a published Docker image

```
docker run -p 3000:3000 -p 5000:5000 -d sweesenkoh/failedquiz1_fiver_app:latest
```

### Docker setup in digital ocean

https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04

### Docker Setup

To build

```
docker build . -t failedquiz1/crypto-app
```

To run (configure api url to server url)

```
docker run -p 3000:3000 -p 5000:5000 --env REACT_APP_API_URL=http://localhost:3000 -d failedquiz1/crypto-app
```

To export image as zip

```
docker save failedquiz1/crypto-app | gzip > failedquiz1_latest.tar.gz
```

To load the exported zip and run

```
docker load < failedquiz1_latest.tar.gz
docker run -p 3000:3000 -p 5000:5000 --env REACT_APP_API_URL=http://localhost:3000 -d failedquiz1/crypto-app
```

To push to remote registry (to your own account)

```
docker tag local-image:tagname new-repo:tagname
docker push new-repo:tagname
```

## Description

### DB Design

https://lucid.app/lucidchart/45281327-603d-459a-bf80-9b9565ae9379/edit?viewport_loc=86%2C-177%2C1865%2C946%2C0_0&invitationId=inv_09cd3151-15be-46dd-ba22-d604ece171a9

### Yarn install error in ubuntu

https://stackoverflow.com/questions/46013544/yarn-install-command-error-no-such-file-or-directory-install
