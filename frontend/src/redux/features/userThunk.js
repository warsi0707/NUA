import { createAsyncThunk } from "@reduxjs/toolkit";
const api = import.meta.env.VITE_BACKEND_URL;


export const signupThunk = createAsyncThunk('fetch/signup', async (payload, {rejectWithValue})=>{
    try{
        const response = await fetch(`${api}/user/signup`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({fullName: payload.fullName, email: payload.email, password:payload.password})
        })
        const result = await response.json()
        if(response.status==200){
            return result
        }else{
            return rejectWithValue(result.error)
        }
    }catch(errror){
        return rejectWithValue(errror)
    }
})
export const signinThunk = createAsyncThunk('fetch/signin', async (payload, {rejectWithValue})=>{
    try{
        const response = await fetch(`${api}/user/signin`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:payload.email, password: payload.password})
        })
        const result = await response.json()
        if(response.status ==200){
            return result
        }else{
            return rejectWithValue(result.error)
        }
        
    }catch(errror){
        return rejectWithValue(errror)
    }
})
export const getListingThunk = createAsyncThunk('fetch/getListing', async (_, {rejectWithValue})=>{
    try{
        const response = await fetch(`${api}/user/listings`,{
            headers: {
               token: localStorage.getItem('token')
            },
        })
        const result = await response.json()
        if(response.status ==200){
            return result
        }else{
            return rejectWithValue(result.error)
        }
    }catch(errror){
        return rejectWithValue(errror)
    }
})
export const getListingByIdThunk = createAsyncThunk('fetch/getListingById', async (id, {rejectWithValue})=>{
    try{
        const response = await fetch(`${api}/user/listings/${id}`,{
            headers: {
                token: localStorage.getItem('token')
            },
        })
        const result = await response.json()
        if(response.status ==200){
            return result
        }else{
            return rejectWithValue(result.error)
        }
    }catch(errror){
        return rejectWithValue(errror)
    }
})
export const postListingThunk = createAsyncThunk('fetch/postListing', async (fileInput, {rejectWithValue})=>{
    try{
        const response = await fetch(`${api}/user/listing`,{
            method: 'POST',
            headers: {
               token: localStorage.getItem('token')
            },
            body: fileInput
        })
        const result = await response.json()
        if(response.status ==200){
            return result
        }
    }catch(errror){
        return rejectWithValue(errror)
    }
})
export const deleteListingThunk = createAsyncThunk('fetch/deletetListing', async (id, {rejectWithValue})=>{
    try{
        const response = await fetch(`${api}/user/listing/${id}`,{
            method: 'DELETE',
            headers: {
               token: localStorage.getItem('token')
            },
        })
        const result = await response.json()
        if(response.status ==200){
            return result
        }
    }catch(errror){
        return rejectWithValue(errror)
    }
})
