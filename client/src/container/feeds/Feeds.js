import React, { useEffect, useState } from 'react';
import './feeds.css';
import TweetBox from '../../components/tweetbox/TweetBox'
import Post from '../../components/post/Post';
import {useSelector} from 'react-redux';
import {useNavigate } from 'react-router-dom';

function Feeds() {
  const navigate = useNavigate();
  const user = useSelector((state)=> state.posts.user)
  const postsData = useSelector((state)=> state.posts.posts);
  const [posts, setPostData] = useState(postsData)
  useEffect(()=>{
    setPostData(postsData)
    
  },[postsData])
  return (
  <div className = {`feed `}>

      {/* Header */}
      <div className = 'feed__header'>
        <h2>Home</h2>
      </div>

      {/* Tweet Box */}
      <TweetBox user = {user}/>

      
      {
        posts && posts.map((post)=>{
          const navToPostPage = ()=>{
          navigate(`/tweets/${post._id}`,{state :{post}})
          }
        return <div key = {post._id} onClick={navToPostPage}><Post user = {user} content = {post} tweet = {post.tweet} id = {post._id}/></div>}
        )
      }
      

  </div>);
}

export default Feeds;
