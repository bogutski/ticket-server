const Album = require('../Model');
const message = require('../../utils/messages');
const { get } = require('lodash');

async function albumUpdateById(req, res) {
  const albumId = get(req, 'params.albumId');
  const userId = get(req, 'userData.userId');

  Album.updateOne({ _id: albumId }, { $set: req.body }, { runValidators: true })
    .exec()
    .then((doc) => {
      if (doc.n) {
        res.status(200).json(message.success('Album updated'));
      } else {
        res.status(400).json(message.fail('Album not found'));
      }
    })
    .catch((error) => {
      console.log(error);

      res.status(400).json(message.fail('Album update error'));
    });
}

module.exports = albumUpdateById;
