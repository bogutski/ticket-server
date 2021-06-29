const mongoose = require('mongoose');
const Album = require('../Model');
const message = require('../../utils/messages');

function createAlbumQuery(values) {
  const _id = values._id || new mongoose.Types.ObjectId();

  const album = new Album({
    _id,
    ...values,
  });

  return album
    .save()
    .then(() => {
      return message.success('Album created', _id);
    })
    .catch((err) => {
      return message.fail('Album create error', err);
    });
}

module.exports = createAlbumQuery;
