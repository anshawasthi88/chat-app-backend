// const express = require("express")
const User = require("../models/userModel")
const bcrypt = require("bcrypt")

module.exports.register = async(req,res,next) => {
    try{
        const {username,email,password}  = req.body;
        const usernameCheck = await User.findOne({username});
    
        if(usernameCheck){
            return res.json({
                message:"Username already exist",
                success:false,
            })
        }
        const emailCheck = await User.findOne({email});
        if(emailCheck){
            return res.json({
                success:false,
                message:"Email already Used",
            })
        }
    
        const hashedPassword = await bcrypt.hash(password,10);
    
        const user = await User.create({
            email,
            username,
            password:hashedPassword,
        });
    
        // delete user.password;
        return res.json({
            success:true,
            message:"User created Successfully",
            user
        })
    }
    catch(error){
        return next(error);
    }

}

module.exports.login = async(req,res,next) => {
    try{
        const {username,password}  = req.body;
        const user = await User.findOne({username});
    
        if(!user){
            return res.json({
                success:false,
                message:"User does not exist please register first",
            })
        }
    
        const isPasswordValid = await bcrypt.compare(password,user.password);

        if(!isPasswordValid){
            return res.json({
                success:false,
                message:"Incorrect Password",
            })
        }
    
        delete user.password;
        return res.json({
            success:true,
            message:"User loggedIn succefully",
            user,
        })
    }
    catch(error){
        return next(error);
    }
}

module.exports.setAvatar = async(req,res,next) => {
    try{
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(userId,{
            isAvatarImageSet:true,
            avatarImage
        });
        return res.json({
            isSet:userData.isAvatarImageSet,
            image:userData.avatarImage
        })
    }catch(ex){
        next(ex);
    }
}


