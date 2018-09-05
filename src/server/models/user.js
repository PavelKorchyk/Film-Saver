const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  ratedFilms: [
    {
      filmId: { type: Schema.Types.ObjectId, ref: 'Films' },
      rating: Number,
    }
  ]
});

module.exports = mongoose.model('User', UserSchema);