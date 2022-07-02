import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/auth.js';
import Profile from '../models/profile.js';
import mongoose from 'mongoose';
import {ObjectId} from 'mongodb';
import fileRelocator from '../helpers/fileRelocator.js';
import { fileSizeFormatter } from "../helpers/fileFormatter.js";

export const signUp = async(req,res)=>{
    const {email, password, name, month, year, day, username} = req.body
    try{

        // //Check if password is consistent with confirmPassword
        // if ( password !== confirmPassword){ return res.status(400).json({message: "Passwords do not match"})}
        
        //get existingUser with email which is unique email field
        const existingUser = await User.findOne({email})

        if(existingUser){return res.status(400).json({message: 'User already exists'})}
        
        //hashing password then create User with form parameters
        const hashedPassword = await bcrypt.hash(password, 12);
        const createdAt= new Date() 
        const id= new ObjectId
        await  User.create({email, password: hashedPassword,name, username: `${username}`, dateOfBirth: `${month}/${day}/${year}`, createdAt, _id: id})
        const result = await Profile.create({email, name, username: `${username}`, dateOfBirth: `${month}/${day}/${year}`, createdAt, _id: id})
        //token generation
        const token = jwt.sign({email:result?.email, id:result?._id},'test',{expiresIn:'1d'})
        res.status(200).json({result:{...result, password:null}, token})
    }catch(error){
        console.log(`Error creating User: ${error}`)
        res.status(500).json({message: 'Something went wrong'})
    }
}


export const signIn = async(req, res)=>{
    const {email, password} = req.body;
   
    try{ 
    const existingUser = await User.findOne({email})
    if(!existingUser){return res.status(400).json({message: 'User does not exist'})}

    const authPassword = await bcrypt.compare(password,existingUser.password)
    if(!authPassword){return res.status(400).json({message: 'Invalid Password'})}

    const token = jwt.sign({email: existingUser.email, id: existingUser._id},'test', {expiresIn: "1d"}) 
    res.status(200).json({result: {...existingUser,password:null}, token})

} catch(error){
        console.log(`Error signing in: ${error}`)
    }
}

export const googleSignIn = async (req, res)=> {
    const {token, result} = await req.body;
    console.log('google auth')
    try{ 
        const existingUser = await User.findOne({email:result?.email})
        
        if(existingUser){
            return res.status(200).json({result, token})
        }
        const createdAt= new Date();
        
        await User.create({email:result?.email, 
            password: ' ', name:result?.name, username: result?.name.replace(/ /g,''), createdAt, _id: result.googleId
        })
        
        const newUser = await Profile.create({
            email:result?.email, password: ' ', name:result?.name, username: result?.name.replace(/ /g,''), createdAt, _id: result.googleId
        })
        res.status(200).json({result: newUser ,token})
    } catch(err){
        console.log(err)
    }
}

export const checkMail = async (req,res) =>{
    const {email} = await req.body;
    try{
        const existingUser = await User.findOne({email})
        if(existingUser){return res.status(400).json({message: 'Email already exists, Please sign in'})}  
        return res.status(200).json(null)
    }catch(err){
        console.error('-----error------')
    }
}

export const updateProfile = async(req, res)=>{
    const {id, bio, name} = req.body;
    const {userId, files, } = req;
    
    let profileImg;
    let bgImg;
    
        if (files.profileImg){
            const URL = fileRelocator(files.profileImg[0].filename, userId,'profilePicture/')
            profileImg = {
                fileName: files.profileImg[0].filename,
                filePath: URL,
                fileType: files.profileImg[0].mimetype,
                fileSize: fileSizeFormatter(files.profileImg[0].size, 2)
            }
        }
        if (files.bgImg){
            const URL = fileRelocator(files.bgImg[0].filename, userId,'bgPicture/')
            bgImg = {
                fileName: files.bgImg[0].filename,
                filePath: URL,
                fileType: files.bgImg[0].mimetype,
                fileSize: fileSizeFormatter(files.bgImg[0].size, 2)
                
            }
            console.log(bgImg)
        }
    
    
    try{
        const existingProfile = await Profile.findById(id);
        const profile = {...existingProfile, bio, name, bgImg, profileImg}
        const newProfile = await Profile.findByIdAndUpdate(userId, profile, { new: true });
        res.status(201).json(newProfile)
    }catch(err){
        console.log(err)
    }
}