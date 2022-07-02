import { MODALSTATE } from "../../constants/actionTypes";

const modalState =(state = false, action)=>{
    switch(action.type){
        case MODALSTATE:
            return (action.data)
        case 'MODALCOMMENT':
            return (action.data)
        default:
            return state

}
}
export default modalState;