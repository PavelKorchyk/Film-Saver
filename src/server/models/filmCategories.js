const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const filmCategoriesSchema = Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  description: String,
  films: [{ type: Schema.Types.ObjectId, ref: 'Films' }],
});

module.exports = mongoose.model('categories', filmCategoriesSchema);