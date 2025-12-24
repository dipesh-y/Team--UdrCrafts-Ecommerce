import mongoose from 'mongoose';

const productSizeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true
});

const ProductSizeModel = mongoose.model('ProductSize', productSizeSchema);

export default ProductSizeModel;
