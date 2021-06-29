const Album = require('../Model');
const message = require('../../utils/messages');
const { get } = require('lodash');

const albumStats = async (req, res) => {
  const userId = get(req, 'userData.userId');
  try {
    const totalCount = await Album.countDocuments();

    const result = {
      totalCount,
      totalCountDouble: totalCount * 2,
      totalCountTriple: totalCount * 3,
      totalCountTen: totalCount * 10,
    };

    res.status(200).json(message.success('Album Stats ok', result));
  } catch (error) {
console.log(error)

    res.status(400).json(message.fail('Album Stats error'));
  }
};

module.exports = albumStats;
