import './App.css';
import React, {useEffect} from 'react'
import { Home, Auth } from './container';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import Modal from './components/modal/Modal';
import TweetBox from './components/tweetbox/TweetBox';
import Feeds from './container/feeds/Feeds';
import PostPage from './components/postPage/PostPage';
import { modalStateOff } from './actions/ModalState';
import CommentTweet from './components/commentTweet/CommentTweet';
import WelcomePage from './components/welcomePage/WelcomePage';
import SetProfChange from './container/profilePage/setProfChange/SetProfChange';
import ProfilePage from './container/profilePage/ProfilePage';
import ProfileTweet from './container/profilePage/profileTweet/ProfileTweet';
import ProfileTR from './container/profilePage/profileTR/ProfileTR';
import ProfileMedia from './container/profilePage/profileMedia/ProfileMedia';
import ProfileLikes from './container/profilePage/profileLikes/ProfileLikes';


function App() {
  const dispatch = useDispatch()
  const modalState = useSelector(state => state.modalState)
  const user = useSelector((state)=> state.posts.user)
  console.log(user)
  const handleClose = ()=>{
    dispatch(modalStateOff())
  }
  useEffect(()=>{ modalState ?(document.body.style.overflow = "hidden") : (document.body.style.overflow = "scroll")}, [modalState])
  return (
    <div className={`app ${modalState ? 'noScroll' : ''}`}>

    {/* modals */}
        { modalState.tweet === true && (<Modal type= 'gifYouUp' content={<TweetBox modal/>} handleClose = {handleClose}/>)}
        { modalState.active === 'modalCommentOn' && (<Modal type= 'gifYouUp' content={<CommentTweet post={modalState.post}/>} handleClose = {handleClose}/>)} 
        { modalState.profChange === true && (<Modal type= 'gifYouUp' content={<SetProfChange />} handleClose = {handleClose}/>)}


       <BrowserRouter>
        <Routes>
          <Route path = '/auth' exact element = {<Auth/>}/>
          <Route path = '/auth/signup' exact element = {<Auth directModalOn directSignIn={false}/>}  />
          <Route path = '/auth/signin' exact element = {<Auth directModalOn directSignIn/>}  /> 
          <Route path = '/' element = {<Home/>}>
            <Route path = '/tweets'  element = {<Feeds/>}/>
            <Route path = '/tweets/:id'  element = {<PostPage/>}/>
            <Route path = ':username' element = {<ProfilePage user = {user}/>}>
              <Route path = ':tweets' element = {<ProfileTweet/>}/>
              <Route path = ':with_replies' element = {<ProfileTR/>}/>
              <Route path = ':media' element = {<ProfileMedia/>}/>
              <Route path = ':likes' element = {<ProfileLikes/>}/>

            </Route>
            <Route path = '/' exact element = {<WelcomePage/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

