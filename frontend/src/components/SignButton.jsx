import { memo } from "react"

function SignButton({title, handleClick}){
    return (
        <button onClick={handleClick} className="bg-black text-white p-2 text-sm rounded-md cursor-pointer">{title}</button>
    )
}
export default memo(SignButton)