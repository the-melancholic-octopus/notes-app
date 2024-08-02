# Notes-app

A notes application using electron, reactJS and mongoDB

## Database Setup

- Create a MongoDB Atlas cluster and configure network access by adding your IP address and a database user with appropriate roles.
- Obtain the connection string from the cluster's "Connect" button, replacing placeholders with your credentials and database name.
- Use the connection string in your .env file.

## Project Setup

### Development environment

Neovim with TypeScript Language Server and Prettier

### Install

```bash
$ npm install
```

### Development

```bash
$ npm run dev
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```
