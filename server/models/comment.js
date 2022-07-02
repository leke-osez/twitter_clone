import mongoose from 'mongoose';

 const Comment = mongoose.Schema({
    comment: String,
    postFrom: mongoose.ObjectId,
    reciever: String,
    
    username: String,
    creator: String,

    selectedFile: {
        type: String,
        default: null
    },
    retweets:{
        type:[String],
        default:[]
    },
    
    likes: {
        type: [String],
        default: [],
    },
    timestamp: Date,
    comments: {
        type: [String],
        default: [],
    },
    isRetweet: {
        type: Boolean,
        default: false
    }
}) 

export default mongoose.model('Comments',Comment)