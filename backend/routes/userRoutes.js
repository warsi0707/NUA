import express from 'express'
import { delteListing, getListings, sharedListing, signin, signup, uploadListing } from '../controllers/userControllers.js'
import Auth from '../middleware/Auth.js'
import upload from '../utils/MulterUploder.js'

const userRouter = express.Router()


userRouter.post("/signup", signup)
.post("/signin", signin)
.get("/listings", Auth, getListings)
.post("/listing",Auth, upload.array('items', 10), uploadListing )
.get("/listings/:id", Auth, sharedListing)
.delete("/listing/:id", Auth, delteListing)


export default userRouter