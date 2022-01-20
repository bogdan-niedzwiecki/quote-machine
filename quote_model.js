const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);

const quoteSchema = new mongoose.Schema({
  quote: { type: String, required: true },
  author: String,
});

module.exports = mongoose.model('Quote', quoteSchema);