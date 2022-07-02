import { Button } from '@material-ui/core';
import { Twitter } from '@material-ui/icons';
import React, { useState,useEffect } from 'react';
import './auth.css';
import {GoogleLogin} from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {AUTH} from "../../constants/actionTypes";
import Icon from './Icon';
// import { modalTypeSignIn, modalTypeSignUp } from '../../actions/ModalType';
import { modalStateOn, modalStateOff } from '../../actions/ModalState';
import Modal from '../../components/modal/Modal'
import AuthForm from '../../components/authForm/AuthForm';
import { googleAuthLogin } from '../../actions/Auth';

function Auth({directModalOn, directSignIn}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectModalOn = useSelector(state => state.modalState)
  const [isSignUp, setIsSignup] = useState(true)

  const googleFailure = (error)=>{
      console.log(error)
      console.log(`Error Signing in with google, Try again later! ${process.env.REACT_APP_GOOGLE_AUTH_ID}`)
  };

  const googleSuccess = async (res)=>{
      const result = await res?.profileObj;
      const token = await res?.tokenId;
      try{
          dispatch(googleAuthLogin({result,token},navigate))
      } catch(err){

      }

  }

  const signUpAction = ()=>{
    setIsSignup(true)
    dispatch(modalStateOn())

  }

  const signInAction = ()=>{
    setIsSignup(false)
    dispatch(modalStateOn())
  }

  
   useEffect(()=>{
    if (directSignIn){ setIsSignup(false)};
    if (directModalOn){dispatch(modalStateOn());}
   },[]) 
  return (
    <div className = 'authPage'>
             
            {(selectModalOn) && <Modal type= 'gifYouUp' content={<AuthForm isSignUp = {isSignUp} switchMode = {()=> setIsSignup(!isSignUp)}/>}/>} 

        <div className='authPage__content'>
            <div className = 'authPage__image'>
                <img src = 'https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png' alt = 'twitter_bg'/>
                <Twitter className = 'authPage__twitterLogoBanner'/>
            </div>

            <div className = 'authPage__auth'>

              <Twitter className = 'authPage__twitterLogo'/>
              <h1>Happening now</h1>
              <h2>Join Twitter today.</h2>

              <GoogleLogin
                    clientId = {process.env.REACT_APP_GOOGLE_AUTH_ID} 
                    render = {(renderProps)=>(
                        <Button 
                            className = "auth__googleSignUpButton" 
                            onClick = {renderProps.onClick} 
                            disabled = {renderProps.disabled} 
                            startIcon ={<Icon/>} 
                        >
                            Google Sign In
                        </Button> 
                    )} 
                    onSuccess={googleSuccess}
                    onFailure = {googleFailure}
                    cookiePolicy= 'single_host_origin'
                />

              <button className = 'authPage__signUpButton' onClick={signUpAction}>Sign up with phone or email</button>
            
              <p>Already have an account? </p>
              <button className = 'authPage__signInButton' onClick={signInAction}>Sign in</button>
            </div>
        </div>

        

        <div className= 'authPage__footer'>
            
        </div>
    </div>
  )
}

export default Auth