import React, {useEffect, useRef, useState} from 'react'
import {Sidebar, Widgets} from '../index';
import './home.css';
import {useDispatch,  } from 'react-redux';
import {getPosts} from '../../actions/Post'
import { Outlet } from 'react-router-dom';


function Home() {
  const dispatch = useDispatch();
  const [isLogoutMenu, setIsLogoutMenu] = useState(false);
  const clicked = useRef(null)
  const handleHomeClick = (e)=>{
    
    if (e.nativeEvent.path.includes(clicked?.current?.target)){
      return e.stopPropagation()
    }
    setIsLogoutMenu(false)
  }
  const stopProp = (e)=>{
    e.stopPropagation()
  }
  
  useEffect(()=>{
    dispatch(getPosts())
  },[dispatch]);

  return (
    <div className = 'home' onClick={handleHomeClick}>

        {/* Sidebar */}
        <Sidebar isLogoutMenu = {isLogoutMenu} 
          setLogoutMenu = {(e)=>{
            clicked.current = e
          setIsLogoutMenu(!isLogoutMenu)}} 
          stopProp = {stopProp}
          />
        
        {/* Switchable page content from powered by the awesome react-router */}
        <div className = 'home__body'><Outlet/></div>
        
        {/* Widgets */}
        <Widgets/>
    </div>
  )
}

export default Home