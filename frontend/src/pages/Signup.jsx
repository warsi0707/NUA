import { Link, useNavigate } from "react-router";
import FormInput from "../components/FormInput";
import SignButton from "../components/SignButton";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { signupThunk } from "../redux/features/userThunk";
import PasswordInput from "../components/PasswordInput";

export default function Signup(){
    const loading = useSelector(state=> state.user.logLoading)
    const navigagte = useNavigate()
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullname] = useState('')

    const handleSignup =async()=>{
        dispatch(signupThunk({email, password, fullName}))
        navigagte("/signin")
    }
    return (
       <div className="min-h-screen lg:w-[1100px]  mx-auto flex gap-32 flex-col md:flex-row lg:justify-between ">
            <div className="hidden md:flex w-full lg:min-h-screen  justify-start  lg:pt-32 items-start p-5">
                <img src="/sign.svg" className="h-1/2 w-full" alt="" />
            </div>
            <div className="w-full lg:min-h-screen  p-5 flex flex-col gap-3   lg:pt-32">
                <h1 className="text-2xl font-semibold py-5">Register as new user</h1>
                <FormInput value={fullName} handleChange={(e)=> setFullname(e.target.value)}   lable={"Full name"} type={'text'}/>
                <FormInput value={email} handleChange={(e)=> setEmail(e.target.value)}  name={'email'} lable={"Email"} type={'email'}/>
               <PasswordInput value={password} handleChange={(e)=>setPassword(e.target.value)} label={"Password"} name={'password'} lable={"Password"} />
               
                <div className="flex items-center text-sm">
                    <p>Have already an account? </p>
                    <Link to={"/signin"} className="underline text-purple-primary">Log in</Link>
                </div>
                <SignButton handleClick={handleSignup} title={loading? "Loading...":"Register"}/>
            </div>
        </div>
    )
}