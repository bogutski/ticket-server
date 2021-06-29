const mongoose = require('mongoose');

const Schema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,

    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: false,
    },

    images: [{ type: String }],
  },

  { timestamps: {}, versionKey: false },
);

module.exports = mongoose.model('Event', Schema);
