import { Button } from '@material-ui/core'
import React, {useState} from 'react'
import './setProfChange.css';
import ProfilePic from '../profilePic/ProfilePic';
import CloseIcon from '@mui/icons-material/Close';
// import {modalStateOff} from '../../../actions/ModalState';
import {useDispatch, } from 'react-redux';
import InputField from '../../../components/input/Input';
import {updateProfile} from '../../../actions/Auth'

function SetProfChange({ closeModal,user,AVI,bgImgURL}) {
    const dispatch = useDispatch();
    const [profileField, setProfileField] = useState({
        name:user?.name, 
        bio: user?.bio, 
        bgImg: null, 
        profileImg: null,
        prevbgImg: bgImgURL, 
        prevprofileImg: AVI,
    })
    
    const handleChange = (e)=>{
        
        if (e.target.type === 'file'){
            var binaryData = [];
            binaryData.push(e.target.files[0]);
            return setProfileField({
                ...profileField, 
                [e.target.name]: e.target.files[0],
                [`prev` + e.target.name]: URL.createObjectURL(new Blob(binaryData, {type: "application/zip"}))
            })

        }
        setProfileField({...profileField,[e.target.name]:e.target.value})
    }
    const handleSave = (e)=>{
        e.preventDefault()
        const {name, bio,profileImg,bgImg } = profileField
        const formData = new FormData()
        formData.append('name',name)
        formData.append('bio',bio)
        formData.append('profileImg',profileImg)
        formData.append('bgImg',bgImg)

        dispatch(updateProfile(formData,user?._id))
        closeModal()
    }

  return (
    <form onSubmit={handleSave} >
        <div className = 'profileChange'>
            <div className = 'profileChange__header'>
                    <div className='header'>
                        <div onClick = {closeModal} className = 'profileChange__closeButton'><CloseIcon /></div>
                        <h3>Edit profile</h3>
                    </div>

                <div>       
                    <Button 
                        className= 'saveButton' 
                        type = 'submit' 
                        disabled = {!profileField}
                    >
                        Save
                    </Button>  
                </div>
            </div>
            <ProfilePic setProfile={true} profileImgFor = "profPic_imgIn" bgImgFor = 'bgPic_imgIn' AVI = {profileField.prevprofileImg} bgImgURL= {profileField.prevbgImg}/>
             
            {/* <label  className='profPic__label'>
                Set profile picture
            </label> */}
            <input
                type = 'file'
                onChange = {handleChange}
                name = 'profileImg'
                id = 'profPic_imgIn'

            />
            <input
                
                type = 'file'
                onChange = {handleChange}
                name = 'bgImg'
                id = 'bgPic_imgIn'
            />

            <section className='profChange__body'>
                <InputField name = 'name' label ='name' handleChange={handleChange} className = 'profChange__nameInput' type = 'text' fullWidth autoFocus={true} value ={profileField.name} />
                <InputField name = 'bio' label ='bio' handleChange={handleChange} className = 'profChange__bioInput' type = 'text' fullWidth  value ={profileField.bio} rows = {4} multiline/>

                <div className='profChange__DOB'>
                    <p>Birth date</p>
                    <p>{user?.dateOfBirth}</p>
                </div>
            </section>
                         
        </div>
    </form>
  )
}

export default SetProfChange