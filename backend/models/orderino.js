import mongoose from 'mongoose';

const orderinoSchema = mongoose.Schema({
  title: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: String, required: true },
  imageURL: { type: String },
}, { timestamps: true });

// Index on title for faster searches by title
orderinoSchema.index({ title: 1 });

// Index on creation time for sorting newest first
orderinoSchema.index({ createAt: -1});

export default mongoose.model('Recipe', orderinoSchema);
