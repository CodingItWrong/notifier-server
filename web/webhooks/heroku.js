const queue = require('../../lib/queue');

const webhookRoute = (req, res) => {
  console.log(JSON.stringify(req.body));

  const {
    data: {
      app: { name },
      status,
    },
  } = req.body;
  const url = 'https://murmuring-garden-42327.herokuapp.com';

  const message = {
    text: `Build ${status} for app ${name}`,
    url,
  };

  console.log(message);
  queue
    .send('incoming', message)
    .then(() => {
      res.end('Received ' + JSON.stringify(message));
    })
    .catch(e => {
      console.error(e);
      res.status(500);
      res.end(e.message);
    });
};

module.exports = webhookRoute;
