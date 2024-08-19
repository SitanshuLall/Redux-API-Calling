import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//Action
export const fetchTodos = createAsyncThunk('fetchTodos', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    return response.json();
})

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        isLoading: false,
        data: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchTodos.rejected, (state, action) => {
            console.log('Error:', action.payload);
            console.log('Error:', action.error.message);            state.isLoading = false;
            state.isError = true;
        })
    }
});

export default todoSlice.reducer;

//middleware is a function that takes two arguments, first is the store and second is the next function, it is used to modify the action before it reaches the reducer, it is used to make async calls, it is used to log the action, it is used to dispatch multiple actions, it is used to handle the state, it is used to handle the side effects, it is used to handle the errors

//redux thunk is a middleware that allows you to write action creators that return a function instead of an action, it is used to make async calls, it takes two arguments, first is the dispatch function and second is the getState function, it is used to dispatch actions asynchronously.

//createSlice is a function that takes an object as an argument, the object has three properties, first is the name of the slice, second is the initial state of the slice and third is the reducers object, which has a lot of methods to handle the state, like addCase, addDefaultCase, etc.

//createasyncThunk is used to make async calls, it takes two arguments, first is the name of the thunk and second is a function that returns a promise, the function can take two arguments, first is the payload and second is the thunkAPI object, which has a lot of useful methods like dispatch, getState, etc.    