import { CREATEPOST, GETPOSTS, COMMENTPOST,LIKEPOST, RETWEET,UPDATEPROFILE } from "../constants/actionTypes";

export default function Post(content={posts:null, user:null}, action){

    switch(action.type){
        case CREATEPOST:
            return {...content, posts:[action?.data,...content?.posts]}
        case GETPOSTS:
            return {posts:action?.data?.posts, user: action?.data?.userInfo}
        case UPDATEPROFILE:
            return {...content, user:action?.data}
        case LIKEPOST:
        case RETWEET:
        case COMMENTPOST:
            return {...content, posts:content.posts.map((post) => (post._id === action.data._id ? action.data : post))};
        
        default:
            return content
    }
}