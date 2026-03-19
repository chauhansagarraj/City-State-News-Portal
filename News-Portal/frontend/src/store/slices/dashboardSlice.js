import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import API from "../../services/axios"

export const getDashboard = createAsyncThunk(
"/journalist-dashboard",
async (_, {rejectWithValue}) => {

try{

const res = await API.get("/journalist-dashboard")

return res.data

}catch(err){

return rejectWithValue(err.response.data)

}

}
)

const dashboardSlice = createSlice({

name:"dashboard",

initialState:{
stats:null,
articles:[],
loading:false
},

extraReducers:(builder)=>{

builder

.addCase(getDashboard.pending,(state)=>{
state.loading=true
})

.addCase(getDashboard.fulfilled,(state,action)=>{
state.loading=false
state.stats = action.payload.stats
state.articles = action.payload.articles
})

}

})

export default dashboardSlice.reducer