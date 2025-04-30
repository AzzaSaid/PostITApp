import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as ENV from "../config";

const initialState = {
    status: "idle",
    posts: [],
    comments: [],
    likes: [],
};

export const savePost = createAsyncThunk("posts/savePost", async (postData) => {
    try {
      const response = await axios.post(`${ENV.SERVER_URL}/savePost`, {
        postMsg: postData.postMsg,
        email: postData.email,
      });
      const post = response.data.post;
      return {post}; //Return the new post to Redux
  
    } catch (error) {
      console.log(error);
    }
});

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(savePost.pending, (state) => {
          state.status = "loading";
        })
        .addCase(savePost.fulfilled, (state, action) => {
          console.log(action.payload.post);
          state.status = "succeeded";
          state.posts.unshift(action.payload.post);
        })
        .addCase(savePost.rejected, (state, action) => {
          state.status = "failed";
        })

        .addCase(getPosts.pending, (state) => {
            state.status = "loading";
        })
        .addCase(getPosts.fulfilled, (state, action) => {
          state.status = "succeeded";
          console.log(action.payload);
          state.posts = action.payload;
        })
        .addCase(getPosts.rejected, (state, action) => {
          state.status = "failed";
        })

        .addCase(likePost.pending, (state) => {
          state.status = "loading";
        })
        .addCase(likePost.fulfilled, (state, action) => {
          state.status = "succeeded";
          const updatedPostIndex = state.posts.findIndex(
            (post) => post._id === action.payload._id
          );
          if (updatedPostIndex !== -1) {
            state.posts[updatedPostIndex].likes = action.payload.likes;
          }
        })
        .addCase(likePost.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        })
    }
});

export const getPosts = createAsyncThunk("post/getPosts", async () => {
    try {
      const response = await axios.get(`${ENV.SERVER_URL}/getPosts`);
      return response.data.posts;
    } catch (error) {
      console.log(error);
    }
  });

export const likePost = createAsyncThunk("posts/likePost", async (postData) => {
  try {
    const response = await axios.put(
      `${ENV.SERVER_URL}/likePost/${postData.postId}`,
      {
        userId: postData.userId,
      }
    );
    const post = response.data.post;
    return post;
  } catch (error) {
    console.log(error);
  }
});

export default postSlice.reducer;