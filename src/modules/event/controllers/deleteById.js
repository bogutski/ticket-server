const Event = require('../Model');
const message = require('../../utils/messages');
const { get } = require('lodash');

const eventDeleteById = (req, res) => {
  // читаем id из параметров URL запроса
  const _id = get(req, 'params.eventId');

  // Получаем id текущего пользователя
  const userId = get(req, 'userData.userId');

  Event.deleteOne({ _id })
    .exec()
    .then((doc) => {
      if (doc.n) {
        res.status(200).json(message.success('Event deleted'));
      } else {
        res.status(400).json(message.fail('Event not found'));
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(message.fail('Event delete error'));
    });
};

module.exports = eventDeleteById;
