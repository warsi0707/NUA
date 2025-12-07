import User from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import { USER_JWT_SECRET } from "../utils/utils.js";
import Listing from "../models/listingModel.js";

export const signup =async(req,res)=>{
    const {email, fullName, password} = req.body;
    try{
        if(!email || !fullName || !password){
            return res.status(404).json({
                error: "All input required"
            })
        }
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(404).json({
                error: "Email exist, please login"
            })
        }
        const hashPassword = await bcrypt.hash(password,10)

        await User.create({
            email,
            fullName,
            password: hashPassword
        })
        return res.json({
            message: "Signup success"
        })
    }catch(error){
        return res.status(404).json({
            error: error
        })
    }
}
export const signin = async(req, res)=>{
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({
                error: "Email not found, please register"
            })
        }
        const comparePass =user?await bcrypt.compare(password, user.password): false;

        if(comparePass){
            const token =  jwt.sign({
                user: user._id
            },USER_JWT_SECRET)
            return res.json({
                token: token,
                message: 'Signin success',
                user: {
                    fullName: user.fullName,
                    email: user.email
                }
            })
        }
    }catch(error){
         return res.status(404).json({
            error: error
        })
    }
}
export const uploadListing =async(req, res)=>{
    const {names} = req.body;
    try{
        if(req.files.length <=0){
            return res.json({
                error: "Please select at least one files"
            })
        }
        const itemUrls = req.files.map((item)=> item.path)
        const newListing = await Listing.create({
            names,
            items: itemUrls,
            userId: req.user
        })
        return res.json({
            message: 'Uploded',
            listing: newListing
        })
    }catch(error){
        return res.status(404).json({
            error: error
        })
    }
}
export const getListings = async(req, res)=>{
    try{
        const listings = await Listing.find({userId: req.user})
        if(listings.length <=0){
            return res.json({
                listings: []
            })
        }
        return res.json({
                listings: listings
            })
    }catch(error){
        return res.status(404).json({
            error: error
        })
    }
}
export const sharedListing = async(req, res)=>{
    try{
        const listings = await Listing.findById(req.params.id).populate('userId','-password -listings')
        if(!listings){
            return res.status(404).json({
                error: "Not found",
                listings: {}
            })
        }
        return res.json({
                listings: listings
            })
    }catch(error){
        return res.status(404).json({
            error: error
        })
    }
}
export const delteListing =async(req,res)=>{
    try{
        const listing = await Listing.findByIdAndDelete(req.params.id, {userId: req.user})
        return res.json({
            message: "Removed",
            listing: listing
        })
    }catch(error){
        return res.status(404).json({
            error: error
        })
    }
}