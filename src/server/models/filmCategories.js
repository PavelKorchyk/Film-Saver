const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FilmCategoriesSchema = Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  description: String,
  films: [{ type: Schema.Types.ObjectId, ref: 'Films' }],
  avatar: String,
});

module.exports = mongoose.model('Categories', FilmCategoriesSchema);