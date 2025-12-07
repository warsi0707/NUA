import { useState } from "react"
import {useDispatch} from 'react-redux'
import { postListingThunk } from "../redux/features/userThunk"


export function UploadListing({setIsUploading}){
    const dispatch = useDispatch()
    const [fileInput, setFileInput] = useState(null)
    const [names, setNames] = useState("")

    const handlePost =(e)=>{
        e.preventDefault()
        const formData = new FormData()

        formData.append("names", names)
        if (fileInput) {
            Array.from(fileInput).forEach((file) => {
                formData.append("items", file);
            });
        }
        dispatch(postListingThunk(formData))
        setIsUploading(false)
    }

    return(
        <div onClick={()=> setIsUploading(false)} className="min-h-screen w-full bg-black/70 fixed top-0 left-0 z-50 mx-auto flex justify-center items-center">
            <div onClick={(e)=> e.stopPropagation()} className="bg-white w-96 py-5 pb-10 p-2 rounded-md space-y-5">
                <div className="flex justify-between">
                    <h1 className="text-2xl">Post your listing</h1>
                    <button onClick={()=> setIsUploading(false)} className="cursor-pointer"><i className="fa-solid fa-xmark"></i></button>
                </div>
                    <form action="" onSubmit={handlePost} className="space-y-5" encType="multipart/form-data">
                    <div className="flex  flex-col">
                        <label htmlFor="">Select file type</label>
                        <select value={names} onChange={(e)=> setNames(e.target.value)} name="" id="" className="border p-2 rounded-md">
                            <option value="">Select file type</option>
                            <option value="PDF">PDF</option>
                            <option value="IMG">IMG</option>
                        </select>
                    </div>
                        <label htmlFor="">Select files</label>
                        <input type="file" onChange={(e)=> setFileInput(e.target.files)} multiple className="p-2 border rounded-md cursor-pointer" />
                    <button type="submit" className="bg-black text-white w-full p-2 rounded-md cursor-pointer">Post</button>
                    </form>
            </div>
        </div>
    )
}