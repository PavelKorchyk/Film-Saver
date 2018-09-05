const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FilmsSchema = Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  description: String,
  avatar: String,
  gallery: Array,
  rating: Number,
  categories: {type: Schema.Types.ObjectId, ref: 'Categories'},
  comments: [
      {time: { type: Date, default: Date.now },
      user_id: String,
      userName: String,
      text: String,
      },
    ]
});

module.exports = mongoose.model('Films', FilmsSchema);