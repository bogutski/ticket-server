const mongoose = require('mongoose');
//import Album from '../Model';
const message = require('../../utils/messages');
const { get } = require('lodash');
const createAlbumQuery = require('../queries/create');

async function albumCreate(req, res) {
  // Создаем id материала который будет создан
  const _id = new mongoose.Types.ObjectId();

  // Получаем id текущего пользователя
  const userId = get(req, 'userData.userId');

  // Читаем данные из запроса
  const name = get(req, 'body.name');
  const description = get(req, 'body.description');

  const createAlbumQueryResult = await createAlbumQuery({
    _id,
    name,
    description,
    owner: userId,
  });

  if (createAlbumQueryResult.success) {
    res.status(200).json(createAlbumQueryResult);
  } else {
    console.log(createAlbumQueryResult.payload);

    res.status(400).json(message.fail('Album create error'));
  }
}

module.exports = albumCreate;
