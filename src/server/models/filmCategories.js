const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const filmCategoriesSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  description: String,
  films: Array,
});
filmCategoriesSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('filmCategories', filmCategoriesSchema);