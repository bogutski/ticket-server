const Album = require('../Model');
const message = require('../../utils/messages');
const { get } = require('lodash');

const albumDeleteById = (req, res) => {
  // читаем id из параметров URL запроса
  const _id = get(req, 'params.albumId');

  // Получаем id текущего пользователя
  const userId = get(req, 'userData.userId');

  Album.deleteOne({ _id })
    .exec()
    .then((doc) => {
      if (doc.n) {
        res.status(200).json(message.success('Album deleted'));
      } else {
        res.status(400).json(message.fail('Album not found'));
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(message.fail('Album delete error'));
    });
};

module.exports = albumDeleteById;
