const Album = require('../Model');
const message = require('../../utils/messages');
const { get } = require('lodash');
const escapeRegExp = require('../../utils/escapeRegExp');
const paginationSearchFormatter = require('../../utils/paginationSearchFormatter');

// Поиск с пагинацией

const albumSearch = async (req, res) => {
  const userId = get(req, 'userData.userId');

  try {
    let limit = +get(req, 'body.limit', 20);
    limit = limit > 100 ? 100 : limit; // показать не больше 100
    const page = +get(req, 'body.page', 1);

    // параметры поиска
    const name = get(req, 'body.name', '');
    // const accessType = get(req, 'body.accessType', 'all');

    // формирование запроса
    const query = {};

    if (name) {
      query.name = { $regex: escapeRegExp(name), $options: 'i' };
    }

    // if (accessType) {
    //   query.accessType = { $eq: accessType };
    // }

    const totalCountPromise = Album.countDocuments(query); // Находим кол-во результатов
    const searchPromise = albumSearchQuery({ query, page, limit }); // Находим результат

    // Запускаем запросы параллельно
    const PromiseAllResult = await Promise.all([totalCountPromise, searchPromise]);

    const searchResultCount = PromiseAllResult[0];
    const searchResult = PromiseAllResult[1];

    const result = paginationSearchFormatter({
      page,
      limit,
      searchResultCount,
      searchResult: searchResult.payload,
    });

    res.status(200).json(message.success('AlbumSearch ok', result));
  } catch (error) {
    console.log(error);
    res.status(400).json(message.fail('AlbumSearch error'));
  }
};

module.exports = albumSearch;

function albumSearchQuery({ query, page, limit }) {
  return Album.find(query)
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(limit * (page - 1))
    .exec()
    .then((docs) => {
      return message.success('Album found', docs);
    });
}
