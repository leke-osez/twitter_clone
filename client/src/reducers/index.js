import { combineReducers } from 'redux';
import authReducer from './auth';
import modalState from './modal/modalState';
import posts from './post'
import comments from './comment'
// import ModalType from './modal/modalType'


export const reducers = combineReducers({  authReducer, modalState, posts, comments});