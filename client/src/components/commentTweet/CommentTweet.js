import React,{useState} from 'react'
import { Avatar, Button } from '@material-ui/core';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import './commentTweet.css';
import { commentPost } from '../../actions/Post';
import {useDispatch, } from 'react-redux';
import {modalStateOff} from '../../actions/ModalState'


function CommentTweet({post}) {
    const {tweet, username,id} = post;
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const handleChange = (e)=>{
        setComment(e.target.value)
    }
    const handleComment = (e)=>{
        e.preventDefault()
        dispatch(commentPost(id, {comment, username}));
        dispatch(modalStateOff())
    }
  return (
    <div className='CommentTweet'>
        <div className = 'CommentTweet_Owner'>
            
            <div className="CommentTweet__avatar">
                <Avatar src = 'https://ih1.redbubble.net/image.1789937146.8840/poster,504x498,f8f8f8-pad,600x600,f8f8f8.jpg' className = {`CommentTweet__avatar`}/>
            </div>

            <div>
                <div className="CommentTweet__headerText">
                    <h4> {`${username}`} </h4>
                    <VerifiedUserIcon className = 'CommentTweet__badge'/> 
                    <span className='CommentTweet__username'>{`@${username}`}</span>    
                </div>

                <div className='CommentTweet__content'>
                    <p className = 'CommentTweet__tweet'>{tweet}</p>
                    <p>Replying to <span className='inlineText'>{`@${username}`}</span></p>
                </div>
            </div>  
            
                
            

            {/* {image && 
            <div className = 'CommentTweet__image'>
                <img
                    src = 'https://cdnb.artstation.com/p/assets/images/images/032/352/375/large/samuel-zachary-robotboy.jpg?1606199183'
                    alt = 'robot boy'
                />
            </div>} */}
            
        </div>

        
        <form onSubmit = {handleComment} className = 'CommentTweet__form'>
            <div className = 'CommentTweet__reply' >
                <Avatar src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5mkVGNgRTVjqPazghDItd8ISTuQclMT9dVQ&usqp=CAU' className = {`CommentTweet__avatar`}/>
                <textarea
                    placeholder="Tweet your reply" 
                    type = 'text' 
                    onChange={handleChange}
                    name = 'tweet'
                    value = {comment}
                   
                />
            </div>

            <Button className = 'CommentTweet__button' type = 'submit'>Reply</Button>
        </form>
        
    </div>
  )
}

export default CommentTweet