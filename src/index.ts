import express from "express";
import {contentModel, userModel} from './db'
import  jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";
import { userMiddleware } from "./middleware";

const app=express();
app.use(express.json())

app.post('/signup',async (req,res)=>{
    const {username,password}=req.body;

    const user=await userModel.create({
        username,
        password
    })

    res.json({
        message: "user signup"
    })
})

app.post('/signin',async (req,res)=>{
    const {username,password}=req.body;

    const existingUser=await userModel.findOne({
        username,
        password
    })

    if(existingUser){
        const token = jwt.sign({
            id: existingUser._id
        },JWT_SECRET)

        res.json({
            message: token
        })
    }else{
        res.json({
            message: "incorrect"
        })
    }

    
})

app.post('/api/v1/content',userMiddleware,async (req,res)=>{
    const {link,title}=req.body;

    await contentModel.create({
        link,title,
        userId: req.userId,
        tags: []
    })

    res.json({
        message: "content added"
    })
})

app.get('/api/v1/content',userMiddleware,async (req,res)=>{
    const userId=req.userId;

    const content=await contentModel.find({
        userId
    }).populate('userId',"username")

    res.json({
        message: content
    })
})

app.delete('/api/v1/content',userMiddleware,async (req,res)=>{
    const contentId=req.body.contentId;

    contentModel.deleteMany({
        contentId,
        userId: req.userId
    })

    res.json({
        message: "deleted successfully"
    })

})





app.listen(3000);
