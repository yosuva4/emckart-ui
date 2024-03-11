
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userName: null,
        alldata: {}
    },
    reducers: {
        updateUsername: (state, action) => {
            state.alldata = action.payload
            state.userName = action.payload.name
        },
        loginFail: (state, action) => {
            state.userName = 'fail'
            state.alldata = {}
        },
        clearUsername: (state, action) => {
            state.alldata = {}
            state.userName = 'fail'
        }
    },
})

export const { updateUsername, clearUsername, loginFail } = userSlice.actions
export default userSlice

