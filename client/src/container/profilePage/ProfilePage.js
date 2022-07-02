import './profilePage.css';
import {  Button } from '@material-ui/core';
import { useNavigate, useParams,Link } from 'react-router-dom';
import { ArrowBack, } from '@material-ui/icons';
import React,{useState, useEffect} from 'react';
import PageTitle from './pageTitle/PageTitle';
// import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../components/modal/Modal';
import SetProfChange from './setProfChange/SetProfChange';
import ProfilePic from './profilePic/ProfilePic'
import { Outlet } from 'react-router-dom';
import {DOMAIN}  from '../../constants/others'
import fetchPhoto from '../../helper/photoToURL';


function ProfilePage({user}) {
    const navigate = useNavigate();
    const {username, tweets} = useParams();
    // const dispatch = useDispatch();
    const [bgImgURL,setBgImgURL] = useState(null)
    const [AVI,setAVI] = useState(null)
    const [modalOn, setModalOn] = useState(false)

    const [activeState, setActiveState] = useState({tweets:true});
    console.log(activeState)
    const handleEdit = ()=>{
        setModalOn(true)
    }    

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 
                    'November', 'December' ]
    
                    //raw date of birth data 
    const rawDOB = user?.createdAt.match(/\d+/g)
    const getbgImg = (data)=>{
        setBgImgURL(data)
    }

    const getprofileImg = (data)=>{
        setAVI(data)
    }
    useEffect(()=>{
        const fetchImg = async()=>{
            if (user){
                    fetchPhoto(DOMAIN + user?.bgImg?.filePath, getbgImg) 
                    fetchPhoto(DOMAIN + user?.profileImg?.filePath, getprofileImg) 
            }
        }
        fetchImg()
    }, [user])
    useEffect(()=>{
        setActiveState({[tweets]:true})

    },[tweets])
  return (
    <div className = 'profilePage'>
        {modalOn && 
        <Modal content = {
            <SetProfChange 
                closeModal= {()=>setModalOn(false)} 
                user = {user}
                AVI = {AVI}
                bgImgURL = {bgImgURL}
            />
            } 
            type = 'dropIn' 
            handleClose={()=>setModalOn(false)}
        />}
        <div className = 'profilePage__header'>
            <div className= 'backButton'><Button onClick = {()=>navigate(-1)}> <ArrowBack />  </Button></div>
            <div>
                <h4>{username}</h4>
                <p style = {{color:'grey', fontSize: 14}}>0 tweets</p>
            </div>
        </div>
        <ProfilePic AVI = {AVI} bgImgURL= {bgImgURL}/>
        <div className = 'profilePage__content'>
        <Button variant = "outlined" className = "profilePage__edit" onClick = {handleEdit}>Edit profile </Button>

       { user && (<div className = 'profilePage__info'>

            <h4>{user?.name}</h4>
            <p className = 'textLightStyle'>{`@${username}`}</p>

            {/* joined at */}
            <p className = 'textLightStyle'>{`Joined at ${months[Number(rawDOB[1]-1)]} ${rawDOB[2]}, ${rawDOB[0]}` }</p>

            <div className='profilePage__follow'>
                <p style ={{marginRight: 10}} className = 'textLightStyle'>
                  <span className = 'profilePage__bold' style = {{color:'black'}}  >{user?.following.length}</span> 
                  following
                </p>
                <p className = 'textLightStyle'>
                  <span className = 'profilePage__bold' style = {{color:'black'}}>{user?.followers.length}</span> 
                  followers
                </p>  
            </div>
        </div>)}



        
        <div className ='profilePage__body'>
            <div className = 'profilePage__pageTitle'>
                <Link to={`tweets`} replace = {true}><PageTitle text= 'Tweets' isActive={activeState?.tweets} name = 'tweets' /></Link>
                <Link to = 'with_replies' replace = {true}><PageTitle text= 'Tweets & replies' isActive={activeState?.with_replies} name = 'tweetsNR' /></Link>
                <Link to = 'media' replace = {true}><PageTitle text= 'Media' isActive={activeState?.media} name = 'media' /></Link>
                <Link to = 'likes' replace = {true}><PageTitle text= 'Likes' isActive={activeState?.likes} name = 'likes' /></Link>

            </div>
            <section>
                <Outlet/>
            </section>
        </div>
        </div>
    </div>
  )
}

export default ProfilePage