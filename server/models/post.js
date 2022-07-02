import mongoose from 'mongoose';

 const post = mongoose.Schema({
    
    tweet: String,  //tweet in text fmt
    username: String, //username of creator
    name: String, //name of creator
    creator: String, //id of creator
    tags: [String],
    file: {
        fileName: {type: String},
        filePath: {type: String},
        fileType: {type: String},
        fileSize: {type: String}
    },  //tweet in file fmt(image, picture)

    retweets:[{type: String, ref: 'User', default: []}],
    
    likes:[{type: String, ref: 'User', default: []}],

    timestamp: Date,
    
    comments: [{type: mongoose.ObjectId, ref: 'Comments', default: []}],
    isRetweet: {
        type: Boolean,
        default: false
    }
}) 

export default mongoose.model('Posts',post)