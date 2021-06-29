const Album = require('../Model');
const message = require('../../utils/messages');
const { get } = require('lodash');

const albumGetById = (req, res) => {
  const albumId = get(req, 'params.albumId');
  const userId = get(req, 'userData.userId');

  Album.findById(albumId)
    // подтягивает данные из соседних коллекций, аналог SQL JOIN
    // .populate({
    //   path: 'members',
    //   select: 'name links',
    // })
    // .populate({
    //   path: 'lectures',
    //   options: { sort: { date: -1 } },
    //   populate: { path: 'understood', select: 'name' },
    // })
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(message.success('Get Album by id ok', doc));
      } else {
        res.status(404).json(message.fail('No album for provided id'));
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(message.fail('Album get error'));
    });
};

module.exports = albumGetById;
