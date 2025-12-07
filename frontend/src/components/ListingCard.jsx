import { memo } from "react"
const api = import.meta.env.VITE_BACKEND_URL;

function ListingCard({listing, handleDelete}){
    const newData = new Date(listing.uploadedAt)
    const day = newData.toLocaleDateString('en-IN', {day: '2-digit'})
    const month = newData.toLocaleDateString('en-IN', {month: 'short'})
    const year = newData.toLocaleDateString('en-IN', {year: 'numeric'})

    return (
        <div className="bg-slate-100 border border-gray-300 space-y-5 shadow-md max-h-72 h-auto w-full sm:w-80 rounded-md p-2 relative">
            <button onClick={()=> alert(`https://nua-1-frontend.onrender.com/${listing._id}`)} className="absolute top-5 right-5 bg-slate-300 p-2 border cursor-pointer rounded-md"><i className="fa-solid fa-paper-plane"></i></button>
            {listing?.names === 'IMG' && 
            <img src={`${api}/${listing?.items[0]}`} className="rounded-md max-h-52 w-full" alt="" />}
            {listing?.names === 'PDF' && 
                <object data={`${api}/${listing?.items[0]}`} type="application/pdf"  className="w-full"></object>
            }
            <div className="">
                <div className="flex justify-between">
                    <p className="text-xl">{listing?.items[0].split('-')[1]}</p>
                    <button onClick={handleDelete} className="cursor-pointer"><i className="fa-solid fa-trash"></i></button>
                </div>
                <p className="text-sm">{day} {month} {year}</p>
            </div>
        </div>
    )
}
export default memo(ListingCard)