import mongoose from 'mongoose';

const orderinoSchema = mongoose.Schema({
  title: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: String, required: true },
  imageURL: { type: String },
}, { timestamps: true });

export default mongoose.model('Recipe', orderinoSchema);
