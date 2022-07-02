import React,{useRef, } from 'react';
import './sidebar.css';
import SidebarOptions from '../../components/sidebarOptions/SidebarOptions.js';
import TwitterIcon from '@material-ui/icons/Twitter.js'
// import SearchIcon from '@material-ui/icons/Search';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import HomeIcon from '@material-ui/icons/HomeRounded'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import ListAltIcon from '@material-ui/icons/ListAlt'
import PermIdentityIcon from '@material-ui/icons/PermIdentity'
// import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { Button } from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux'
import { modalTweetOn, } from '../../actions/ModalState';
import {Link} from 'react-router-dom';
import UserAvatar from '../../components/userAvatar/UserAvatar.js';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import { logOut } from '../../actions/Auth';


function Sidebar({setLogoutMenu, isLogoutMenu, stopProp}) {
  const dispatch = useDispatch();
  const user = useSelector((state)=> state.posts.user)
  const getHeight = useRef(null)
  const handleTweet = ()=>{
    dispatch(modalTweetOn())
  }  

  return (
    
  <div className = 'sidebar'>
      {/* Twitter icon */}
        <TwitterIcon className = {`sidebar__twitterIcon`}/>
      {/* SidebarOption */}

      <div className = 'sidebar__content'>
        <Link to = '/' className = 'sidebar__text'><SidebarOptions Icon = {HomeIcon} text = "Home"/></Link>
        <Link to = '/trends' className = 'sidebar__text'><SidebarOptions IconText = '#' text = "Explore"/></Link>
        <Link to = '/notifications' className = 'sidebar__text'><SidebarOptions Icon = {NotificationsNoneIcon} text = "Notifications"/></Link>
        <Link to = '/messages' className = 'sidebar__text'><SidebarOptions Icon = {MailOutlineIcon} text = "Messages"/></Link>
        <Link to = 'bookmarks' className = 'sidebar__text'><SidebarOptions Icon = {BookmarkBorderIcon} text = "Bookmark"/></Link>
        <Link to = '/lists' className = 'sidebar__text'><SidebarOptions Icon = {ListAltIcon} text = "Lists"/></Link>
        <Link to = {`/${user?.username}/tweets`} className = 'sidebar__text'><SidebarOptions Icon = {PermIdentityIcon} text = "Profile"/></Link>
        {/* <Link to = ''><SidebarOptions Icon = {MoreHorizIcon} text = "More"/></Link> */}

      </div>
        
      {/* Tweet icon */}
      <Button variant = "outlined" className = "sidebar__tweet" onClick = {handleTweet}>Tweet </Button>

        <div className = 'sidebar__avatar' onClick={setLogoutMenu}  ref= {getHeight}>
          <UserAvatar/>
          <MoreHoriz className = 'sidebar__avatarMore' name = 'sidebar_account'/>
          {
          isLogoutMenu && 
          <div className = 'sidebar__account' onClick = {stopProp}  name = 'sidebar_account' style = {getHeight && {bottom:  (getHeight.current?.clientHeight  )}}>
              <UserAvatar/>
            <Button onClick = {()=>dispatch(logOut())} name = 'sidebar_account' className = 'logout__button'>Log out <span className='avatar__name'> @{user?.name.replace(/ /g, "")}</span></Button>
          </div>
          }
        </div>
  </div>
  
  );
}

export default Sidebar;
