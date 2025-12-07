import { createSlice } from "@reduxjs/toolkit";
import { deleteListingThunk, getListingThunk, postListingThunk, signinThunk, signupThunk } from "./userThunk";
import toast from "react-hot-toast";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: JSON.parse(localStorage.getItem('user')),
        token: localStorage.getItem('token'),
        isAuthenticated: false,
        logLoading: false,
        listings: []
    },
    reducers: {
       authVerify: (state)=>{
            const token = localStorage.getItem('token') || null
            const user = JSON.parse(localStorage.getItem('user'))
            if(token && token.length >0){
                state.isAuthenticated = true
                state.user = user
            }
        },
        userLogout :(state, action)=>{
            const token = localStorage.getItem('token')
            if(token){
                state.isAuthenticated = false
                state.token = null
                state.user = {}
                toast.success("Logout")
                localStorage.removeItem('token')
                localStorage.removeItem('user')
            }
        },
    },
    extraReducers: (builder)=>{
        builder.addCase(signupThunk.pending, (state)=>{
            state.logLoading = true
        })
        .addCase(signupThunk.rejected, (state,action)=>{
            state.logLoading = false
            toast.error(action.payload)
        })
        .addCase(signupThunk.fulfilled, (state, action)=>{
            state.logLoading = false
            toast.success(action.payload.message)
        })
        .addCase(signinThunk.pending, (state)=>{
            state.logLoading = true
        })
        .addCase(signinThunk.rejected, (state,action)=>{
            state.logLoading = false
            toast.error(action.payload)
        })
        .addCase(signinThunk.fulfilled, (state, action)=>{
            state.logLoading = false
            toast.success(action.payload.message)
            state.user = action.payload.user
            state.token = action.payload.token
            localStorage.setItem('user', JSON.stringify(action.payload.user))
            localStorage.setItem('token', action.payload.token)
            state.isAuthenticated = true
        })
        .addCase(postListingThunk.pending, (state)=>{
            state.logLoading = true
        })
        .addCase(postListingThunk.rejected, (state,action)=>{
            state.logLoading = false
            toast.error(action.payload)
        })
        .addCase(postListingThunk.fulfilled, (state, action)=>{
            toast.success(action.payload.message)
            state.listings = [...state.listings, action.payload.listing]
        })
        .addCase(getListingThunk.pending, (state)=>{
            state.logLoading = true
        })
        .addCase(getListingThunk.rejected, (state)=>{
            state.logLoading = false
        })
        .addCase(getListingThunk.fulfilled, (state,action)=>{
            state.logLoading = false
            state.listings = action.payload.listings
        })
        .addCase(deleteListingThunk.pending, (state)=>{
            state.logLoading = true
        })
        .addCase(deleteListingThunk.rejected, (state)=>{
            state.logLoading = false
        })
        .addCase(deleteListingThunk.fulfilled, (state,action)=>{
            state.logLoading = false
            toast.success(action.payload.message)
            state.listings = state.listings.filter((item)=> item._id!== action.payload.listing._id)
        })
    }
})

export const {authVerify, userLogout} = userSlice.actions
const userReducer = userSlice.reducer;
export default userReducer;