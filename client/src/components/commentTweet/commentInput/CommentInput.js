import React,{useState} from 'react'
import { Avatar, Button } from '@material-ui/core';
import './commentInput.css'

function CommentInput({id,username, handleComment}) {
    const [comment, setComment] = useState('');
    const handleChange = (e)=>{
        setComment(e.target.value)
    }
    const onCommentChange = (e)=>{
        e.preventDefault()
        if (comment === '' ) return;
        handleComment(comment)
        setComment('')
    }
  return (
    <form onSubmit = {onCommentChange} className = 'CommentTweet__form'>
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
  )
}

export default CommentInput