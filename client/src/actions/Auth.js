//Authentication page 

import * as api from '../api';
import {AUTH, LOGOUT, UPDATEPROFILE} from '../constants/actionTypes'

export const signIn = (formData, history)=> async(dispatch)=>{

        try{
            const {data} = await api.signIn(formData)
            console.log(`error signing ${data}`)
            if (data){
                dispatch({type: AUTH, data})
                history('/')
            }
            
        } catch(error){
            dispatch({type:'AUTH_ERROR', data:error.response.data.message})
            console.log(error)
        }
}

export const logOut = ()=>(dispatch)=>{
    try{
        dispatch({type:LOGOUT})
    }catch(err){
        console.log(err)
    }
}

export const signUp = (formData, history)=> async(dispatch)=>{

    try{
        const {data} = await api.signUp(formData)
        dispatch({type: AUTH, data})
        history('/')
    } catch(error){
        console.log(error)
    }
}

export const checkIfMailExist = async(email)=>{
    try{
        const {data} = await api.checkEmailExist(email)
        console.log(data)
        return data
    }catch(err){
        console.log(err.response)
        return(err.response.data.message)
    }
}

export const googleAuthLogin = ({token, result},history)=> async(dispatch)=>{
    
    try{
        const {data} = await api.googleSignIn({token, result})
        dispatch({type: AUTH, data})
        history('/')
    } catch(error){
        console.log(error)
    }
}

export const updateProfile = (profileField,id)=> async(dispatch)=>{
    
    try{
        const {data} = await api.updateProfile(profileField,id)
        dispatch({type: UPDATEPROFILE, data})
        
    } catch(error){
        console.log(error)
    }
}