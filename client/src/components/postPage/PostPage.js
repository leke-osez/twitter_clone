import './postPage.css';
import {useParams} from 'react-router-dom';
import { Avatar, Button } from '@material-ui/core';
import React,{useState, useEffect, useRef} from 'react';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import { ArrowBack, Twitter } from '@material-ui/icons';
import { useLocation,useNavigate } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {getComments} from '../../actions/Post';
import CircularProgress from '@mui/material/CircularProgress';
import CommentInput from '../commentTweet/commentInput/CommentInput';
import { commentPost } from '../../actions/Post';
import { cancelTokenSource } from '../../api';
import axios from 'axios'

function PostPage({image, }) {
const {id} = useParams();
const location = useLocation();
const navigate = useNavigate();
const dispatch = useDispatch();
const commentList = useSelector((state)=>state.posts.posts)
const [comments, setComments] = useState(null);
const [isLoading, setIsLoading] = useState(true);
const post = location?.state?.post;


const handleComment = (comment)=>{
  dispatch(commentPost(post?._id, {comment, username: post?.username}));

}

 
useEffect(()=>{
  const getData = async()=>{
    try{
      const data = await getComments(post?._id)
      console.log(data)
      setComments(data.comments)
    }catch(err){
      if (axios.isCancel(err.message)) {
        console.log('successfully aborted');  
      }
      console.log(err)
    }
    
  };
   getData()
  },[commentList]);

useEffect(()=>{
  if (comments){
    setIsLoading(false)
  }

},[comments])


  return (
    <>
    <div className = 'postPage__header'>
      <div className= 'backButton'><Button onClick = {()=>navigate(-1)}> <ArrowBack />  </Button></div>
      <h2>Tweet </h2>
    </div>
    <div className = 'postPage__body'>

      <div className='postPage__user'>
        <div className="postPage__avatar">
          <Avatar src = 'https://ih1.redbubble.net/image.1789937146.8840/poster,504x498,f8f8f8-pad,600x600,f8f8f8.jpg' className = {`tweetBox__avatar`}/>
        </div>
        <div className="postPage__userTitle">
      
          <h4> {`praise ayodele`} <VerifiedUserIcon className = 'postPage__badge'/></h4>
          <span className='postPage__headerSpecial'>  @user_name</span>
                  
        </div>
      </div>
        
        {/* posted content */}
        <div className = 'postPage__post'>
          {post?.tweet && <div> <p>{post?.tweet}</p></div>}

          {image && <div></div>}
        </div>

        <CommentInput handleComment = {handleComment}/>
        
        {/* loading animation */}
        {isLoading && <div className = 'loadingSpinner'><CircularProgress className ='loadingIcon'/></div>}

        {/* comment section */}
        <div className = 'postPage__comments'>
      
          {comments && (
            comments.length === 0 ? <h2 style ={{textAlign: 'center', marginTop: 30}}> No comment yet </h2> :
            comments.map((comment)=> 
              <li key = {comment._id} className = 'postPage__comment'>
                <div className="postPage__avatar">
                  <Avatar src = 'https://ih1.redbubble.net/image.1789937146.8840/poster,504x498,f8f8f8-pad,600x600,f8f8f8.jpg' className = {`tweetBox__avatar`}/>
                </div>
                <div className = 'postPage__commentContent'>
                  
                  <p>{comment.comment}</p>
                  
                  {/* for the comment image section */}
                  {/* <image/> */}
                </div>

              </li>
            )
          )}
        </div>
        
    </div>
  </>
  )
}

export default PostPage