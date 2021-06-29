const Album = require('../Model');
const message = require('../../utils/messages');

const albumGetByIdQuery = (albumId) => {
  return Album.findById(albumId)
    .exec()
    .then((doc) => {
      if (doc) {
        return message.success('Album get by id OK', doc);
      } else {
        return message.fail('No Album for provided id');
      }
    })
    .catch((err) => {
      return message.fail('Get Album by id ERROR', err);
    });
};

module.exports = albumGetByIdQuery;
