import { useDispatch, useSelector } from "react-redux";
import ListingCard from "../components/ListingCard";
import { useCallback, useEffect } from "react";
import { deleteListingThunk, getListingThunk } from "../redux/features/userThunk";

export default function Dashboard(){
    const dispatch = useDispatch()
    const listings = useSelector(state => state.user.listings)
    
    useEffect(()=>{
        dispatch(getListingThunk())
    },[])
    const handleDelete =useCallback((id)=>{
        dispatch(deleteListingThunk(id))
    },[])
    return (
        <div className=" min-h-screen w-full p-5 md:px-32 mx-auto">
            <div className="w-full min-h-screen flex flex-wrap  md:justify-between gap-5">
                {listings.length <=0 && <p className="flex text-2xl mx-auto pt-32">No listing </p>}
                { listings?.map((listing)=>(
                    <ListingCard key={listing._id} listing={listing} handleDelete={()=> handleDelete(listing._id)}/>
                ))}
            </div>
        </div>
    )
}