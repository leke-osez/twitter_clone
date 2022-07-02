import {auth} from '../middleware/auth.js';
import express from 'express';
import upload from '../helpers/fileHelper.js';
import { updateProfile } from '../controllers/auth.js';


const router = express.Router();
const uploadFiles = upload.fields([{name: 'profileImg', maxCount: 1}, {name: 'bgImg', maxCount: 1}])

router.patch(`/:id/updateprofile`, auth, uploadFiles, updateProfile )

export default router
