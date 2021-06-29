const Event = require('../Model');
const message = require('../../utils/messages');
const { get } = require('lodash');

const eventStats = async (req, res) => {
  const userId = get(req, 'userData.userId');
  try {
    const totalCount = await Event.countDocuments();

    const result = {
      totalCount,
      totalCountDouble: totalCount * 2,
      totalCountTriple: totalCount * 3,
      totalCountTen: totalCount * 10,
    };

    res.status(200).json(message.success('Event Stats ok', result));
  } catch (error) {
console.log(error)

    res.status(400).json(message.fail('Event Stats error'));
  }
};

module.exports = eventStats;
