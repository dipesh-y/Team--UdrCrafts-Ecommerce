import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  image: {
    type: String,
    default: ''
  },
  userName: {
    type: String,
    required: true
  },
  review: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }
}, {
  timestamps: true
});

const ReviewModel = mongoose.model('Review', reviewSchema);

export default ReviewModel;
