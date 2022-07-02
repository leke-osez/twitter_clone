import mongoose from 'mongoose';

const userModel = mongoose.Schema({
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
    password:{
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
    
})

export default mongoose.model('User', userModel)