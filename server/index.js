import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import userAuth from './routes/user.js';
import dotenv from 'dotenv';
import posts from './routes/posts.js';
import path from 'path'
import {fileURLToPath} from 'url';
import profile from './routes/profile.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000
dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
app.use('/public', express.static(path.join(__dirname,'public')))

//Routes
app.use('/auth', userAuth)
app.use('/posts', posts)
app.use('/', profile)

mongoose.connect(`${process.env.CONNECTION_URL}`)
        .then(()=>app.listen(PORT,()=>{console.log(`server running on port:-> http://localhost:${PORT}`)}))
        .catch((e)=>console.log('failed to connect to port:' + `${ e}`))

