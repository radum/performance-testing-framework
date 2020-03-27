const withPostgres = require('@build-tracker/plugin-with-postgres').default;

module.exports = withPostgres({
  url: 'http://127.0.0.1:9002',
  pg: {
    user: 'myuser',
    password: 'mypassword',
    host: 'postgres', // This is the docker-componse container name for postgres https://docs.docker.com/compose/networking/
    database: 'postgres'
  }
});
