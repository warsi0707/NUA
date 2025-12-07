import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getListingByIdThunk } from "../redux/features/userThunk";
const api = import.meta.env.VITE_BACKEND_URL;

export default function SharedListing() {
  const dispatch = useDispatch();
  const [listing, setListing] = useState({});
  const { id } = useParams();

  const newData = new Date(listing.uploadedAt)
    const day = newData.toLocaleDateString('en-IN', {day: '2-digit'})
    const month = newData.toLocaleDateString('en-IN', {month: 'short'})
    const year = newData.toLocaleDateString('en-IN', {year: 'numeric'})

  useEffect(() => {
    if(!id) return;
    const getdata = async () => {
      const data = await dispatch(getListingByIdThunk(id));
      setListing(data.payload.listings);
    };
    getdata();
  }, []);
  return (
    <div className="min-h-screen w-full md:w-[1200px]  mx-auto">
      <div className="w-full flex flex-col p-2  min-h-screen py-5 gap-2">
        <div className=" h-full w-full  space-y-5">
          <div>
            <div className="flex items-center gap-5 justify-between pr-10">
              <div className="flex  items-center gap-2">
                <p>Shared by:</p>
                <p>{listing?.userId?.fullName}</p>
              </div>
              
            </div>
            <div className="flex  items-center gap-2">
              <p>Email:</p>
             <p>{listing?.userId?.email}</p>
            </div>
            <div className="flex  items-center gap-2">
              <p>Create at:</p>
              <p>{day} {month} {year}</p>
            </div>
          </div>
          {listing?.names === "IMG" &&
            listing.items.map((item, indx) => (
              <img
                key={indx}
                src={`${api}/${item}`}
                className="rounded-md h-96 w-full"
                alt=""
              />
            ))}
          {listing?.names === "PDF" &&
            listing.items.map((item, indx) => (
              <div key={indx} className="space-y-5">
                <p className="text-2xl font-semibold">{item?.split('-')[1]}</p>
                <object
                  data={`${api}/${item}`}
                  type="application/pdf"
                  className="w-full min-h-screen"
                ></object>
                <></>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
