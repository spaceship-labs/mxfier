module.exports.connections = {

  mongo: {
    adapter: 'sails-mongo',
    url: process.env.DB_URL,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },

  ctbook: {
    adapter: 'sails-mongo',
    url: 'mongodb://ctbooku2:pdt2cnTbK17@104.130.124.57:27017/ctbook-update2'

  }

};
