import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: String,
  stock: { type: Number, required: true },
  thumbnails: [String],
  status: { type: Boolean, default: true },
  code: { type: String, required: true, unique: true }
});

const ProductModel = mongoose.model('Product', productSchema);
export default ProductModel;