const handleIncoming = require('../handleIncoming');

const webhookRoute = (req, res) => {
  console.log(JSON.stringify(req.body));

  const {
    data: {
      app: { name },
      status,
    },
  } = req.body;

  const message = {
    text: `${name}: Build ${status}`,
  };

  handleIncoming(message)
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
