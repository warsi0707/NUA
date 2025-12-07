import { Link, useNavigate } from "react-router";
import FormInput from "../components/FormInput";
import SignButton from "../components/SignButton";
import { useState } from "react";
import PasswordInput from "../components/PasswordInput";
import {useDispatch, useSelector} from "react-redux"
import { signinThunk } from "../redux/features/userThunk";


export default function Signin(){
    const navigagte = useNavigate()
    const dispatch = useDispatch()
    const loading = useSelector(state => state.user.logLoading)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignin =async()=>{
        const data =await dispatch(signinThunk({email, password})).unwrap()
        navigagte("/")
    }

    return (
        <div className="min-h-screen lg:w-[1100px]  mx-auto flex gap-32 flex-col md:flex-row lg:justify-between ">
            <div className="hidden md:flex w-full lg:min-h-screen  justify-start  lg:pt-32 items-start p-5">
                <img src="/sign.svg" className="h-1/2 w-full" alt="" />
            </div>
            <div className="w-full lg:min-h-screen  p-5 flex flex-col gap-3   lg:pt-32">
                <h1 className="text-2xl font-semibold py-5">Login</h1>
                <FormInput value={email} handleChange={(e)=>setEmail(e.target.value)} name={'email'} lable={"Email"} type={'email'}/>
                <PasswordInput value={password} handleChange={(e)=>setPassword(e.target.value)} label={"Password"} name={'password'} lable={"Password"} />
                <div className="flex items-center text-sm">
                    <p>Hav'nt an account? </p>
                    <Link to={"/signup"} className="underline text-purple-primary">Register</Link>
                </div>
                <SignButton title={loading? "Loading...": "Signin"} handleClick={handleSignin}/>
            </div>
        </div>
    )
}