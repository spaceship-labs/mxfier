module.exports.connections = {

  mongo: {
    adapter: 'sails-mongo',
    url: process.env.DB_URL,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },

};
