import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk("fetchTodosThunk",async()=>{
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();
    return data;
})

const todoSlice = createSlice({
    name:"todo",
    initialState:{
        isLoading:false,
        data:[],
        isError:false
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchTodos.pending,(state)=>{
            state.isLoading = true;
        },
        builder.addCase(fetchTodos.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.data = action.payload;
        }),
        builder.addCase(fetchTodos.rejected,(state)=>{
            state.isLoading = false;
            state.isError = true;
        }))     
    }

})



export default todoSlice.reducer;