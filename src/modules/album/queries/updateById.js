const Album = require('../Model');
const message = require('../../utils/messages');

const albumUpdateByIdQuery = ({ albumId, values }) => {
  return Album.updateOne({ _id: albumId }, { $set: values }, { runValidators: true })
    .exec()
    .then((doc) => {
      if (doc.n) {
        return message.success('Album updated');
      } else {
        return message.fail('Album not found');
      }
    })
    .catch((error) => {
      return message.fail('Album update error', error);
    });
};

module.exports = albumUpdateByIdQuery;
