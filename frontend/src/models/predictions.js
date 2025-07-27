const mongoose = require('mongoose')

const predictionSchema = new mongoose.Schema({
  filename: String,
  label: String,
  confidence: Number,
  date: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Prediction', predictionSchema)
