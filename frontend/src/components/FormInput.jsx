import { memo } from "react"

function FormInput({lable, value, handleChange}){
    return (
        <div className="flex flex-col gap-1 w-full">
            <label htmlFor="" className="text-sm">{lable}</label>
            <input value={value} onChange={handleChange} placeholder="Type here" className="border border-gray-400 outline-none p-2 text-sm rounded-md"/>
        </div>
    )
}
export default memo(FormInput)