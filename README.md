<h1 align="center">
    <img src="https://raw.githubusercontent.com/Rocketseat/bootcamp-gostack-desafio-02/master/.github/logo.png" >
</h1>

<h2 align="center">
    FastFeet, The future of parcel deliveries! 📫 🚚💨
</h2>

<h3 align="center">
    Your order treated with great affection. 💌
</h3>

# Cloning this project

```
git clone https://github.com/RennanD/fastfeet.git
```

# ❗️ Requisites

To runed this all project, you need have be the packages installed:

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://legacy.yarnpkg.com/en/) (Optional).

# 💾 Backend

- API RESTFUL created with Node.js using [express](https://expressjs.com/pt-br/).

- For database use PostgresSQL with [sequelize](https://sequelize.org/v5/).

## ⚡️ Start

- For use this api you need have be installed PostgresSQL, I'm use [Docker](https://www.docker.com/), but this is optional.
- If you don't want installing DOCKER, use convencional [Postgres](https://www.postgresql.org/download/) installation.

### Runing Postgres using DOCKER: 🐋

```
docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres
```

#### If you already have a container with DOCKER, run:

```
docker start "CONTAINER DOCKER ID"
```

### Now in your terminal, run:

```
cd backend
yarn
yarn dev
```

#### To debugin, run:

```
yarn dev:debug
```
