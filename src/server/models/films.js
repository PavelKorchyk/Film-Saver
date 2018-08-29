const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const filmsSchema = Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  description: String,
  avatar: String,
  gallery: Array,
  rating: Number,
  categories: {type: Schema.Types.ObjectId, ref: 'categories'},
});

module.exports = mongoose.model('Films', filmsSchema);