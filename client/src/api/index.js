import axios from 'axios'

export var cancelTokenSource = axios.CancelToken.source();

const API = axios.create({
    baseURL: 'http://localhost:4000',
    
})
// export const handleCancelRequest = () => {
//     cancelTokenSource.cancel('Request was canceled');
// };

API.interceptors.request.use((req)=>{
    
    if(localStorage.getItem('profile')){
    
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    req.headers['common']['Content-Type'] = 'multipart/form-data'}
    req.cancelToken = cancelTokenSource.token; //it will update cancelToken on every call

    return req;
})

export const signIn = (formData)=> API.post('/auth/signin', formData)
export const signUp = (formData)=> API.post('/auth/signup', formData)
export const googleSignIn =(data)=>API.post('/auth/googleauthsignin', data)
export const checkEmailExist = (email)=>API.post('/auth/checkmail', email)
export const updateProfile = (data,id)=> API.patch(`/${id}/updateprofile`,data)


export const createPost = (newPost)=> API.post('/posts', newPost,);
export const getPosts = ()=>  API.get('/posts')
export const likePost = (id)=> API.patch(`/posts/${id}/likepost`)
export const retweet = (id)=> API.patch(`/posts/${id}/retweet`)

export const commentPost = (id, commentData)=> API.patch(`/posts/${id}/comments`, commentData)
export const getComments = (id)=> API.get(`/posts/${id}/comments`);


