import {GETCOMMENTS } from "../constants/actionTypes";

export default function comments(state={comments:null},action){

    switch(action.type){
        
        case GETCOMMENTS:
            return {comments:action?.data?.comments}
        default:
            return state
    }
}