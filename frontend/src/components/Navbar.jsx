import { useEffect, useState } from "react";
import { Link } from "react-router";
import { UploadListing } from "../pages/UploadListing";
import { useDispatch, useSelector } from "react-redux";
import { authVerify, userLogout } from "../redux/features/userSlice";

export default function Navbar(){
    const dispatch = useDispatch()
    const isAuthenticated = useSelector(state=> state.user.isAuthenticated)
    const [isMenu, setIsMenu] = useState(false)
    const [isUploading, setIsUploading] = useState(false)

    useEffect(()=>{
        dispatch(authVerify())
    },[])
    return (
        <>
        <div className="w-full p-5 bg-slate-500 flex justify-between  text-white text-xl md:px-32">
            <Link to={"/"}>Nua</Link>
            <div className="space-x-5 hidden md:flex">
                {isAuthenticated == true ?
                <>
                <button onClick={()=> setIsUploading(true)} className="hover:underline cursor-pointer">Upload </button>
                <button onClick={()=> dispatch(userLogout())} className="hover:underline cursor-pointer">Logout</button>
                </>:
                 <>
                 <Link to={"/signin"} className="hover:underline">Signin</Link>
                 <Link to={"/signup"} className="hover:underline">Signup</Link>
                 </>}
                 
            </div>
            <div className="md:hidden">
                <button onClick={()=> setIsMenu(!isMenu)} className="cursor-pointer">{isMenu?<i className="fa-solid fa-xmark"></i>:<i className="fa-solid fa-bars"></i>}</button>
            </div>
        </div>
        {isUploading && <UploadListing setIsUploading={setIsUploading}/>}
        </>
    )
}