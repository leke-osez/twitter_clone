import * as api from '../api/index';
import { COMMENTPOST, CREATEPOST, GETPOSTS,LIKEPOST, RETWEET } from '../constants/actionTypes';
import axios from 'axios'

export const createPost = (newPost)=> async(dispatch)=>{
    try{
        const {data} =await api.createPost(newPost)
        dispatch({type: CREATEPOST, data})

    } catch(error){
        console.log(error)
    }
}

export const getPosts = ()=> async (dispatch)=>{
    try{
        const  {data} = await api.getPosts()
        dispatch({type: GETPOSTS, data})
    } catch(error){ 
        console.log(error)
    }
}
export const likePost = (id)=> async (dispatch)=>{
    try{
        const  {data} = await api.likePost(id)
        dispatch({type: LIKEPOST, data})
    } catch(error){ 
        console.log(error)
    }
}
export const retweetPost = (id)=> async (dispatch)=>{
    try{
        const  {data} = await api.retweet(id)
        dispatch({type: RETWEET, data})
    } catch(error){ 
        console.log(error)
    }
}
export const commentPost = (id,commentData)=> async(dispatch)=>{
    try{
        const {data} = await api.commentPost(id,commentData); 
        dispatch({type: COMMENTPOST, data})
    } catch(error){
        console.log(error)
    }

}

export const getComments = async(id)=> {
    try{
        const {data} = await api.getComments(id);
        return data
    }catch(err){
        throw new Error(err)
    }
}

