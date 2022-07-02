import mongoose from 'mongoose';

const profile = mongoose.Schema({
    _id: String,
    username: {
        type: String,
        default: 'user_name'
    },

    name: {
        type: String,
        required: true,
    },

    email:{
        type: String,
        required: true,
    },

    createdAt:{ 
        type: Date,
    },

    dateOfBirth:{
        type: String,
        default: ''
    },
    followers:{
        type : [String],
        default: []
    },
    following:{
        type : [String],
        default: []
    },
    likes: [{type: mongoose.ObjectId, ref: 'Posts', default: []}],
    verified:{
        type: Boolean,
        default: false
    },
    tweets: [{type: mongoose.ObjectId, ref: 'Posts', default: []}],
    
    profileImg:{
        fileName: {type: String, default: null,},
        filePath: {type: String, default: null,},
        fileType: {type: String, default: null,},
        fileSize: {type: String, default: null,},
    },
    bio:{
        type: String,
        default: ''
    },
    bgImg:{
        fileName: {type: String, default: null,},
        filePath: {type: String, default: null,},
        fileType: {type: String, default: null,},
        fileSize: {type: String, default: null,},  
    }
})

export default mongoose.model('Profile', profile)