const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const filmsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  description: String,
  avatar: String,
  gallery: Array,
  rating: Number,
  category: String,
});
filmsSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Films', filmsSchema);