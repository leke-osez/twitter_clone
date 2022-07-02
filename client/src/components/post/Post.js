import { Avatar, Button } from '@material-ui/core';
import React from 'react';
import './post.css';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";
import { useDispatch } from 'react-redux';
import { modalStateComment } from '../../actions/ModalState';
import { retweetPost, likePost } from '../../actions/Post';
import { DOMAIN } from '../../constants/others';

//id ==> id of post, content ==>text content and media, user ==> userDetails
function Post({
    id,
    content,
    user
}) {
  const {tweet, comments, likes, retweets} = content
  const dispatch = useDispatch();
  const post = {tweet, username: user?.name, id}
  const truncate = (string, n)=>{
    if (string?.length > n)  {return (<>{string.substr(0, n-1)} <span className = 'text-white/75 text-sm  cursor-pointer'>...see more</span></> )}
    else {return string}
  }

  const handleComment = (e)=>{
    e.stopPropagation()
    dispatch(modalStateComment(post))
  }

  const handleRetweet = (e)=>{
    e.stopPropagation()
    dispatch(retweetPost(id))
  }
  const handleLike = (e)=>{
    e.stopPropagation()
    dispatch(likePost(id))
  }
  return (
  <div className = 'post'>
      <div className="post__avatar">
        <Avatar src = 'https://ih1.redbubble.net/image.1789937146.8840/poster,504x498,f8f8f8-pad,600x600,f8f8f8.jpg' className = {`tweetBox__avatar`}/>
      </div>

      <div className="post__body">
          <div className="post__header">
              <div className="post__headerText">
                  <h4>
                      {`${content?.username}`} 
                      <span className='post__headerSpecial'><VerifiedUserIcon className = 'post__badge'/>  @user_name</span>
                  </h4>
              </div>
              
          </div>
          <div className='post__Tweet'>
                {truncate(tweet, 150)}
          </div>
          
         {content.file && <div className = 'post__image'>
            <img
                src = {DOMAIN + content.file.filePath}
                alt = {`${content.file.fileName}`}
            />
          </div>}
          
          <div className="post__footer">
              <div onClick = {(e)=> e.stopPropagation()}><Button onClick = {handleComment}>{`${comments.length}`}<ChatBubbleOutlineIcon fontSize = 'small'/></Button></div>
              <Button onClick = {handleRetweet}>{`${retweets.length}`}<RepeatIcon fontSize = "small"/></Button>
              <Button onClick = {handleLike}>{`${likes.length}`}<FavoriteBorderIcon fontSize = "small"/></Button>
              <Button><PublishIcon fontSize = "small"/></Button>
          </div>

      </div>
  </div>);
}

export default Post;
