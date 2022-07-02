import React, {  useState, } from 'react';
import './tweetBox.css';
import { Button, Avatar } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../actions/Post';
import CloseIcon from '@mui/icons-material/Close';
import { modalStateOff } from '../../actions/ModalState';
import PermMediaIcon from '@mui/icons-material/PermMedia';

function TweetBox({ modal }) {
    const user = useSelector(content => content?.posts?.user);
    const dispatch = useDispatch();
    const [tweetData, setTweetData] = useState({ tweet: '', file: null });
    const handleChange = (e) => {
        setTweetData({ ...tweetData, [e.target.name]: e.target.value })
    }
    const clear = () => {
        setTweetData({ tweet: '', file: null });   

    }
    const handleTweet = (e) => {
        e.preventDefault();
        if (tweetData.tweet === '' && tweetData.file === null) return;
        const formData = new FormData();
        formData.append('file', tweetData.file)
        formData.append('username', user.username)
        formData.append('name', user.name)
        formData.append('tweet', tweetData.tweet)

        
        for (let i of formData.entries()) console.log(i)

        dispatch(createPost(formData))
        clear();
        handleClose()
    }

    const handleClose = () => {
        dispatch(modalStateOff())
    }

    const singleFileChange = (e) => {
        setTweetData({ ...tweetData, [e.target.name]: e.target.files[0] })
    }

   
    return (
        <div className={`tweetBox ${modal && 'tweetBox__modal'}`}>
            {modal && <Button onClick={handleClose}>{<CloseIcon />}</Button>}
            <form onSubmit={handleTweet} >
                <div className={`tweetBox__input ${modal && 'tweetBox__input__modal'}`}>
                    <Avatar src='https://ih1.redbubble.net/image.1789937146.8840/poster,504x498,f8f8f8-pad,600x600,f8f8f8.jpg' className={`tweetBox__avatar`} />
                    <input
                        placeholder="What's happening"
                        type='text'
                        onChange={handleChange}
                        name='tweet'
                        value={tweetData.tweet}
                    />

                </div>

                {/* image entry field */}
                {tweetData.file && (
                    <div className='tweetBox__prevImage'>
                        <img src={URL.createObjectURL(tweetData?.file) } alt='preview_upload_tweet_img' />
                        <Button 
                            onClick={() =>{
                            setTweetData({ ...tweetData, file: null })
                            
                            }} 
                            className='closeButtonPrev'
                        >
                            <CloseIcon />
                        </Button>

                    </div>)}
                <div className='tweetBox__bottomSection'>
                    <label htmlFor="textbox_imgIn" className='tweetBox__label'>
                        <PermMediaIcon className='tweetBox__imgLogo' />
                    </label>
                    <input
                        className='textbox__imageInput'
                        placeholder='Enter Image URL'
                        type='file'
                        onChange={(e) => singleFileChange(e)}
                        name='file'
                        id='textbox_imgIn'
                    />
                    <Button className='tweetBox__tweetButton' type='submit' >Tweet</Button>
                </div>
            </form>
        </div>);
}

export default TweetBox;

