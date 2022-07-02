import React from 'react'
import { Avatar, } from '@material-ui/core';
import {useSelector} from 'react-redux';
import './userAvatar.css'

function UserAvatar() {
    const user = useSelector((state)=> state.posts.user)

  return (
      <div className = 'UserAvatar'>
          <Avatar src = 'https://wallpaperaccess.com/full/1502826.jpg' className = 'Username__avatar'/>
          <div className='UserName__name'>
              <p className='UserName__fullname'>{user?.name}</p>
              <p className='UserName__username'>{user?.name}</p>
          </div>
      </div>
  )
}

export default UserAvatar