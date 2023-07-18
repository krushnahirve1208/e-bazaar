require('dotenv').config();
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const connectDB=require("./config/db");
connectDB();
const postRoutes=require("./routes/postsRoute");

const app=express();
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
const port=process.env.PORT||5000;
app.use('/post',postRoutes);
app.listen(5000,()=>{
    console.log(`app is listening at ${port}`);
})