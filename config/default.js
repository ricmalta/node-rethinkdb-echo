module.exports = {
  'rethinkdb': {
    'host': process.env.DB_HOST || 'localhost',
    'port': 28015,
    'authKey': '',
    'db': 'echoblaster',
    'silent': true,
    'min': 8,
    'max': 16,
    'timeoutError': 1000
  },
  'web': {
    'host': process.env.HOST || '0.0.0.0',
    'port': process.env.PORT || 9700
  }
};
