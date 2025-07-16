import mongoose, { model } from "mongoose";
const Schema=mongoose.Schema;
const ObjectId=mongoose.Types.ObjectId;

(async ()=>{
    await mongoose.connect("mongodb+srv://kuvishal056:18ptO2UGw3ltdkJ7@cluster0.krxk3ss.mongodb.net/brainly")
})()

const userSchema=new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}

})

const tagsEnum=['video','image','article','audio' ]

const contentSchema=new Schema({
    link: {type: String, required: true},
    type: { type: String, enum: tagsEnum, required: true },
    tags:[ {type: ObjectId, ref: "Tags"}],
    title: {type: String},
    userId: {type: ObjectId, ref: "User" , required: true}
})

const tagSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true }
});

const Linkschema=new Schema({
    hash : {type : Boolean},
    userId: {type: ObjectId, ref: 'User'}
})

export const userModel=mongoose.model('user',userSchema);
export const contentModel=mongoose.model('content',contentSchema);
export const LinkModel=mongoose.model('links',Linkschema);
export const tagsModel=mongoose.model('tags',tagSchema);