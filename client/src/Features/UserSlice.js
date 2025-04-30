import axios from "axios"
import {createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import * as ENV from "../config";

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async(userData)=>{
    try{
      const response = await axios.post(`${ENV.SERVER_URL}/registerUser`,{
        name: userData.name,
        email: userData.email,
        password: userData.password
      });
    console.log(response);
    const user = response.data.user;
    const msg = response.data.msg;
      return {user,msg};
    }
    catch(error){
      console.log(error)
    }
  }
)

export const login = createAsyncThunk(
  "users/login",
  async (userData,{rejectWithValue}) => {
    try {
      const response = await axios.post(`${ENV.SERVER_URL}/login`, {
        email: userData.email,
        password: userData.password,
      });
      const user = response.data.user;
      const msg = response.data.msg;
      return { user, msg };
    } catch (error) {
      //const msg = 'Invalid credentials';
      const msg = error.response.data.msg;
      return rejectWithValue({ msg });
    }
  }
);

export const logout = createAsyncThunk("/users/logout", async () => {
  try {
    // Send a request to your server to log the user out
    const response = await axios.post(`${ENV.SERVER_URL}/logout`);
    const msg = response.data.msg
    return {msg}
  } catch (error) {}
});

const initialState = {
  user: null,
  status: null,
  msg: null,
  isLogin : false,
};

export const userSlice = createSlice({
  name: "users", //name of the state
  initialState, // initial value of the state
  reducers: {},
  extraReducers: (builder) => {
    //Asynchronous actions that update the state directly,
    builder
      .addCase(registerUser.pending, (state) => {
        state.status =  "loading"
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status =  "success"
        state.user = action.payload.user
        state.msg = action.payload.msg
      })
      .addCase(registerUser.rejected, (state) => {
        state.status =  "rejected"
        state.msg = "Unexpected error is occurred"
      })

      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "success";
        state.isLogin = true;
        state.user = action.payload.user;
        state.msg = action.payload.msg;
      })
      .addCase(login.rejected, (state,action) => {
         state.status="rejected"
         state.isLogin = false;
         state.user = null;
         state.msg = action.payload.msg;
      })

      .addCase(logout.pending, (state) => {
        state.status ="loading"
      })
      .addCase(logout.fulfilled, (state,action) => {
        // Clear user data or perform additional cleanup if needed
        state.isLogin = false;
        state.status = "success";
        state.user = null;
        state.msg = action.payload.msg;
      })
      .addCase(logout.rejected, (state) => {
        state.status="rejected"
      });
  },
});

//export const { registerUser } = userSlice.actions;
export default userSlice.reducer;