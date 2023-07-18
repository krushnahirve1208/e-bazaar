const Router=require('express').Router;
const router=Router();
const {getPosts,createPost}=require("../controllers/postController");
router.get('/',getPosts);
router.post('/',createPost);
module.exports=router;