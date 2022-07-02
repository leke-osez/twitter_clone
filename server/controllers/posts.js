import Post from "../models/post.js";
// import User from "../models/auth.js";
import Comment from "../models/comment.js";
import Profile from "../models/profile.js";
import { fileSizeFormatter } from "../helpers/fileFormatter.js";
import fileRelocator from "../helpers/fileRelocator.js";


export const createPost = async (req, res) => {
    const data = req.body;
    const { file, userId, fileName } = req;
    const body = {
        ...data,
        creator: userId,
        timestamp: new Date().toISOString()
    }
    const relPath = 'tweets/'

     
    file && (
        body.file = {
            fileName,
            filePath: fileRelocator(fileName, userId, relPath),
            fileType: file.mimetype,
            fileSize: fileSizeFormatter(file.size, 2)
        })
    const newPost = new Post(body);
    try {
        await newPost.save()
        const user = await Profile.findById(userId);
        user.tweets.push(newPost._id)
        await Profile.findByIdAndUpdate(userId, user, { new: true })
        res.status(200).json(newPost)
    } catch (err) {
        console.log(err)
    }
}



export const getPosts = async (req, res) => {
    const userId = req.userId

    try {
        const posts = await Post.find().sort({ "timestamp": -1 });
        const userInfo = await Profile.findById(userId)
        res.status(200).json({ posts, userInfo });
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

export const deletePost = async (req, res) => {
    const data = req.body;
    const { id } = req.params;

    // if (!mongoose.Types.ObjectId.isValid(id)) {return res.status(404).send(`No post with id: ${id}`);}

    try {
        const post = await Post.findById(id)
        const comments = post.comments
        if (comments.length > 0) {
            await Comment.deleteMany({ _id: { $in: comments } })
        }
        await Post.findByIdAndRemove(id);
        res.json({ message: "Post deleted successfully." });
    } catch (err) {
        console.log(err)
    }
}

export const likePost = async (req, res) => {
    const { id } = req.params;
    // if (!mongoose.Types.ObjectId.isValid(id)) {return res.status(404).send(`No post with id: ${id}`);}
    try {
        const post = await Post.findById(id)
        const index = post.likes.findIndex((id) => id === String(req.userId))
        const user = await Profile.findById(req.userId)

        if (index == -1) {
            post.likes.push(req.userId)
            user.likes.push(id)

        } else {
            post.likes = post.likes.filter((id) => id !== String(req.userId))
            user.likes = user.likes.filter((idPost) => String(idPost) !== String(id))

        }
        const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
        await Profile.findByIdAndUpdate(req.userId, user, { new: true })
        res.json(updatedPost);

    } catch (err) {
        console.log(err)
    }
}

export const reTweet = async (req, res) => {

    //if creator id not equal to user id --> retweeted!!!
    const { id } = req.params;

    // if (!mongoose.Types.ObjectId.isValid(id)) {return res.status(404).send(`No post with id: ${id}`);}

    try {
        const post = await Post.findById(id)
        const user = await Profile.findById(req.userId)
        const index = post.retweets.findIndex((id) => id === String(req.userId))

        if (index == -1) {
            post.retweets.push(req.userId)
            user.tweets.push(id)

        } else {
            post.retweets = post.retweets.filter((id) => id !== String(req.userId))
            user.tweets = user.tweets.filter((idPost) => String(idPost) !== String(id))

        }
        const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
        await Profile.findByIdAndUpdate(req.userId, user, { new: true })
        res.json(updatedPost);


    } catch (err) {
        console.log(err)
    }
}

export const commentPost = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    const comment = new Comment({
        postFrom: id,
        comment: data.comment,
        // name: data.name,
        username: data.username,
        creator: req.userId.toString(),

        // selectedFile: {
        //     type: String,
        //     default: null
        // },

        timestamp: new Date().toISOString(),


    })

    try {
        const post = await Post.findById(id)
        post.comments.push(comment._id);
        const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true },);
        await comment.save();
        res.status(200).json(updatedPost)

    } catch (err) {
        console.log(`failed to post comment ${err}`)
    }

}
export const getComments = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post
            .findById(id)
            .populate('comments')
            .exec(function (err, post) {
                const comments = post.comments.reverse()
                if (err) console.log(err);
                res.status(200).json({ comments })
            });
    } catch (err) {
        res.json({ message: err })
    }
}

export const deleteComment = async (req, res) => {
    const { idComment, } = req.params;
    const { idPost } = req.body;

    try {
        const post = await Post.findById(idPost)
        post.comments = post.comments.filter((id) => id !== idComment)
        await Post.findByIdAndUpdate(idPost, post, { new: true })
        await Comment.findByIdAndRemove(idComment)

    } catch (err) {
        console.log(err)
    }
}