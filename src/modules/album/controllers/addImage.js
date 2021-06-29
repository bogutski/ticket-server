const Album = require('../Model');
const message = require('../../utils/messages');
const { get } = require('lodash');

async function albumAddImage(req, res) {
  const albumId = get(req, 'params.albumId');
  const images = get(req, 'file.transforms', '');
  const originalImageUrl = images.find(({ id }) => id === 'original').location;
  const thumbnailImageUrl = images.find(({ id }) => id === 'thumbnail').location;

  Album.updateOne(
    { _id: albumId },
    { $push: { images: [originalImageUrl, thumbnailImageUrl] } },
    { runValidators: true },
  )
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

module.exports = albumAddImage;
