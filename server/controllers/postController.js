const PostMessage =require("../models/postModel");

const getPosts=async (req,res)=>{
    try {
        const posts=await PostMessage.find();
        return res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(404).json({message:error.message});
    }
}
const createPost=async (req,res)=>{
    const post=req.body;
    try {
        const newpost=await PostMessage(post).save();
        res.status(201).json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message});
    }
}
module.exports={getPosts,createPost};