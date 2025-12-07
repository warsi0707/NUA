import jwt from 'jsonwebtoken'
import { USER_JWT_SECRET } from '../utils/utils.js'

const Auth =(req, res, next)=>{
    const token = req.headers.token
    try{
        if(!token){
            return res.status(404).json({
                error: "No authenticated"
            })
        }
        const decoded = jwt.verify(token, USER_JWT_SECRET)
        if(!decoded){
            return res.status(404).json({
                error: "No authenticated"
            })
        }
        req.user = decoded.user
        next()
    }catch(error){
        return res.status(404).json({
            error: error
        })
    }
}

export default Auth;