import express from 'express';
import {googleSignIn, signIn,signUp, checkMail} from '../controllers/auth.js'

const router = express.Router()

router.post('/signin', signIn);
router.post('/signup', signUp);
router.post('/googleauthsignin',googleSignIn)
router.post('/googleauthsignin',googleSignIn)
router.post('/checkmail', checkMail)

export default router