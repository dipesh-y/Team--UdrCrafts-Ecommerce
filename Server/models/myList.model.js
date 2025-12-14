import mongoose from 'mongoose';

const myListSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    productTitle: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    OldPrice: {
        type: Number,
        default: 0
    },
    brand: {
        type: String,
        default: ''
    },
    discount: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});
 
const MyListModel = mongoose.model('MyList', myListSchema);

export default MyListModel;