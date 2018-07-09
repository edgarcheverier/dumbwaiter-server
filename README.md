# Smartwaiter Backend

[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

> Api service for the Smartwaiter app frontends based on GraphQL.
> Authorization method works using JWT (https://jwt.io/).
> For frontend users the validation includes a check with Facebook login

* For the frontends refer to the following repositories

https://github.com/edgarcheverier/smartwaiter-customer

https://github.com/lars-berger/smartwaiter-rms


## Table of contents

* [Getting started](#getting-started)
* [Usage](#usage)
* [Tech Stack](#tech-stack)
* [Developers team](#developers-team)
* [License](#license)

## Getting started

A few things you have to take in consideration before using Smartwaiter Backend

After cloning the repo you'll have to:

### Install global and local dependancies:

* [Node](https://nodejs.org/en/): `brew install node`
* [Npm](https://www.npmjs.com/): `npm install`
* [Homebrew](https://brew.sh/)

### Install and configure Mysql database

* Install Mysql on your machine and run the service (macOS):

```bash
brew info mysql
brew tap homebrew/services
brew services start mysql
```

For Windows installation refer to:
https://dev.mysql.com/downloads/windows/installer/8.0.html

For Linux installation refer to:
https://dev.mysql.com/doc/refman/8.0/en/linux-installation.html

* Change your Msyql user password:

```bash
mysqladmin -u username password 'yourpassword'
```

* Access Mysql and create the needed databases:

```bash
mysql -u username -pyourpassword
```

* Create developing database:

```bash
mysql> CREATE DATABASE smartwaiter_develop;
```

* Create testing database:

```bash
mysql> CREATE DATABASE smartwaiter_testing;
```

* Facebook app
For using the Facebook login in the Frontend you will need to create a Facebook App
https://developers.facebook.com/docs/apps/

* Setup .env file:
For development the .env file only has the configuration of the Facebook App.

```dotenv
FACEBOOK_APP_ID=<facebook-app-id>
FACEBOOK_API_VERSION=v3.0
```

## Usage

After cloning the repository install npm packages and start the server:

```bash
cd smartwaiter-server
npm install
npm run dev
```
* GraphQL
You can access the GraphQL playground to do querys and mutations through the following link while running the project
http://localhost:4000/explore

## Tech Stack

* [Express](https://expressjs.com/)
* [GraphQL](https://graphql.org/)
* [Mysql](https://www.mysql.com/)
* [Sequelize](http://docs.sequelizejs.com/)
* [Facebook App](https://developers.facebook.com/docs/apps/)

## Developers team

* Edgar Cheverier - [Github](https://github.com/edgarcheverier) - [LinkedIn](https://es.linkedin.com/in/edgar-hugo-cheverier-aguilar-886b3a86)

* Marlon Becker - [Github](https://github.com/marlonbs) - [LinkedIn](https://www.linkedin.com/in/marlon-becker-santos-07ab52a/)

* Henri Viiralt - [Github](https://github.com/viiralt) - [LinkedIn](https://www.linkedin.com/in/viiralt/)

* Benjamin Kemp - [Github](https://github.com/BenjaKemp) - [LinkedIn](https://es.linkedin.com/in/edgar-hugo-cheverier-aguilar-886b3a86)

* Lars Berger - [Github](https://github.com/lars-berger) - [LinkedIn](https://www.linkedin.com/in/lars-berger/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/edgarcheverier/smartwaiter-server/LICENSE) file for details
