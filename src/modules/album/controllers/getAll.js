const Album = require('../Model');
const message = require('../../utils/messages');
const { get } = require('lodash');

// Такие контроллеры нельзя давать всем.
// Использовать только на начальных этапах
// так как ответ может быть слишком большим

const albumGetAll = (req, res) => {
  // Получаем id текущего пользователя
  const userId = get(req, 'userData.userId');

  // Найти все
  Album.find()
    .sort({ createdAt: -1 })
    // .select('name') // если нужно получить отдельные поля
    .exec()
    .then((docs) => {
      res.status(200).json(message.success('Get all albums ok', docs));
    })
    .catch((error) => {
      console.log(error);

      res.status(400).json(message.fail('Album get all error'));
    });
};

module.exports = albumGetAll;
