import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    loggedIn: false,
    loading: false
}

const authSlice = createSlice ({
    name:"authState",
    initialState:initialState,
    reducers:{
        setLoggedIn(state, action){
            state.loggedIn = action.payload
        },
        setLoading(state, action){
            state.loading = action.payload
        }
    }
})

export const {setLoggedIn, setLoading} = authSlice.actions;
export default authSlice.reducer;