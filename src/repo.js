const db = require('../models');

const { Message } = db;

const create = attrs => Message.create(attrs);

const list = () =>
  Message.findAll({
    order: [['id', 'DESC']],
    limit: 100,
  });

module.exports = { create, list };
