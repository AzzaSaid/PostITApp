import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserModel from "./Models/UserModel.js";
import PostModel from "./Models/PostModel.js";
import * as ENV from "./config.js";

const app = express()
app.use(express.json())
app.use(cors())

const constr=`mongodb+srv://${ENV.DB_USER}:${ENV.DB_PASSWORD}@postitcluster.ezydmca.mongodb.net/${ENV.DB_NAME}?retryWrites=true&w=majority&appName=PostITCluster`
mongoose.connect(constr)
app.post("/registerUser",async(req,res)=>{
    try{
        const{name,email,password} =req.body
        const user =  UserModel({name,email,password})
        await user.save()
        res.send({user:user, msg:"User date is added"})
    }
    catch(error){
        res.status(400).json({error:"Unexpected error occurred"})
    }
})

app.post("/login", async (req, res) => { 
    try { 
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email: email });
  
      if (!user) { 
        res.status(500).send({ msg: "Couldn't find the user" });
      }
      else if (user.password !== password) {
        res.status(500).json({ msg: "Password is incorrect" });
      }
      else {
        res.send({user: user,msg:"Authentication is  successfull"})
      }
    }
    catch (error) { 
      res.status(500).json({error:"An unexpected error occurred"})
    }
})
  
app.post("/logout", async (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});

app.post("/savePost", async (req, res) => {
  try {
    const postMsg = req.body.postMsg;
    const email = req.body.email;

    const post = new PostModel({
      postMsg: postMsg,
      email: email,
    });

    await post.save();
    res.send({ post: post, msg: "Added." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/getPosts", async (req, res) => {
  try {
    // Fetch all posts from the "PostModel" collection, sorted by createdAt in descending order
    const posts = await PostModel.find({}).sort({ createdAt: -1 });

    const countPost = await PostModel.countDocuments({});

    res.send({ posts: posts, count: countPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.put("/likePost/:postId/", async (req, res) => {
  const postId = req.params.postId;
  const userId = req.body.userId;
    try {
    const postToUpdate = await PostModel.findOne({ _id: postId });
    if (!postToUpdate) {
      return res.status(404).json({ msg: "Post not found." });
    }
    const userIndex = postToUpdate.likes.users.indexOf(userId);
    if (userIndex !== -1) {
      const udpatedPost = await PostModel.findOneAndUpdate(
        { _id: postId },
        {
          $inc: { "likes.count": -1 },
          $pull: { "likes.users": userId },
        },
        { new: true }
      );
      res.json({ post: udpatedPost, msg: "Post unliked." });
    } else {
      const updatedPost = await PostModel.findOneAndUpdate(
        { _id: postId },
        {
          $inc: { "likes.count": 1 },
          $addToSet: { "likes.users": userId },
        },
        { new: true }
      );
      res.json({ post: updatedPost, msg: "Post liked." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(ENV.PORT,()=>{console.log("server is connected")})