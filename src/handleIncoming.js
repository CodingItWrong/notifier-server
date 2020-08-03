const repo = require('./repo');
const { send } = require('./socket');
const { push } = require('./expo');

const handleIncoming = message =>
  repo.create(message).then(record => {
    console.log('Saved ' + JSON.stringify(record));
    return Promise.all([send(record), push(record)]);
  });

module.exports = handleIncoming;
