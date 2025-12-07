import { memo, useState } from "react";

function PasswordInput({label, value, handleChange}){
    const [isHide, setIsHide] = useState(false) 
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm">{label}</label>
            <div className="border border-gray-400 w-full flex justify-between px-2 rounded-md">
                <input value={value} onChange={handleChange} type={isHide? "text": "password"} placeholder="Type here" className=" p-2 w-full outline-none text-sm " />
                <button onClick={()=> setIsHide(!isHide)} className="cursor-pointer">{isHide?<i className="fa-regular fa-eye-slash"></i>:<i className="fa-regular fa-eye"></i>}</button>
            </div>
        </div>
    )
}
export default memo(PasswordInput)