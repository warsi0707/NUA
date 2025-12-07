import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
    names: {
        type: String,
        required:true
    },
    items: [{
        type: String,
        required: true
    }],
    uploadedAt: {
        type: Date,
        default: Date.now()
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Listing = mongoose.model('Listing', listingSchema)
export default Listing;