import {createAsyncThunk, createSlice, createAction} from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";


//Redirect action
const resetUserRegister = createAction("user/register/reset");
const resetUserLogin = createAction("user/login/reset");
const resetUserUpdated = createAction("user/update/reset");

//Register action

export const registerUserAction = createAsyncThunk(
  "user/register",
  async (payload, {rejectWithValue, getState, dispatch}) => {
    const config = {
        headers: {
          "Content-Type": "application/json",
        },
    }
    try {
        //make http call
        const {data} = await axios.post(`${baseURL}/users/register`, 
        payload,
        config);
        dispatch(resetUserRegister());
        return data;
    } catch (error) {
      if(!error?.response){
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Login action

export const loginUserAction = createAsyncThunk(
  "user/login",
  async (payload, {rejectWithValue, getState, dispatch}) => {
    const config = {
        headers: {
          "Content-Type": "application/json",
        },
    }
    try {
        //make http call
        const {data} = await axios.post(`${baseURL}/users/login`, 
        payload,
        config);
        //Save user into local storage
        localStorage.setItem('userInfo', JSON.stringify(data));
        dispatch(resetUserLogin());
        return data;
    } catch (error) {
      if(!error?.response){
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Logout action
export const logoutAction = createAsyncThunk(
  "/user/logout",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      localStorage.removeItem("userInfo");
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Profile
export const userProfileAction = createAsyncThunk(
  "user/profile",
  async (id, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.get(`${baseURL}/users/profile/`, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Update action
export const updateUserAction = createAsyncThunk(
  "users/update",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.put(
        `${baseURL}/users/update`,
        {
          lastname: userData?.lastname,
          firstname: userData?.firstname,
          email: userData?.email,
        },
        config
      );
      //dispatch
      dispatch(resetUserUpdated());
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);


//Get user from local storage and place it inside our store
const userLoginFromStorage = localStorage.getItem("userInfo") ? JSON.parse
(localStorage.getItem("userInfo"))
: undefined;

//Slices

const usersSlices = createSlice({
    name: "users",
    initialState: {
      userAuth: userLoginFromStorage,
    },
    extraReducers: (builder) => {
      
      //Register
        builder.addCase(registerUserAction.pending, (state, action) => {
          state.userLoading = true;
          state.userAppErr = undefined;
          state.userServerErr = undefined;
        });
        builder.addCase(resetUserRegister, (state, action) => {
          state.isRegistered = true;
        });
        builder.addCase(registerUserAction.fulfilled, (state, action) => {
          state.userLoading = false;
          state.registered = action?.payload;
          state.userAppErr = undefined;
          state.userServerErr = undefined;
          state.isRegistered = true;
        });
        builder.addCase(registerUserAction.rejected, (state, action) => {
          state.userLoading = false;
          state.userAppErr = action?.payload?.msg;
          state.userServerErr = action?.error?.msg;
        });  
          
      //Login
        // Handle pending state
        builder.addCase(loginUserAction.pending, (state, action) => {
            state.userLoading = true;
            state.userAppErr = undefined;
            state.userServerErr = undefined;
        });
        builder.addCase(resetUserLogin, (state, action) => {
          state.isLogin = true;
        });
        // Handle fulfilled state
        builder.addCase(loginUserAction.fulfilled, (state, action) => {
            state.userAuth = action?.payload;
            state.userLoading = false;
            state.userAppErr = undefined;
            state.userServerErr = undefined;
        });
        // Handle rejected state
        builder.addCase(loginUserAction.rejected, (state, action) => {
          
            state.userLoading = false;
            state.userAppErr = action?.payload?.msg;
            state.userServerErr = action?.error?.msg;
        });

      //logout
        builder.addCase(logoutAction.pending, (state, action) => {
          state.userLoading = false;
        });
        builder.addCase(logoutAction.fulfilled, (state, action) => {
          state.userAuth = undefined;
          state.userLoading = false;
          state.userAppErr = undefined;
          state.userServerErr = undefined;
        });
        builder.addCase(logoutAction.rejected, (state, action) => {
          state.userAppErr = action?.payload?.message;
          state.userServerErr = action?.error?.message;
          state.userLoading = false;
        });

         // Profile
        builder.addCase(userProfileAction.pending, (state, action) => {
          state.userLoading = true;
          state.userAppErr = undefined;
          state.userServerErr = undefined;
        });

        builder.addCase(userProfileAction.fulfilled, (state, action) => {
          state.userLoading = false;
          state.profile = action?.payload;
          state.userAppErr = undefined;
          state.userServerErr = undefined;
        });
        builder.addCase(userProfileAction.rejected, (state, action) => {
          state.userLoading = false;
          state.userAppErr = action?.payload?.message;
          state.userServerErr = action?.error?.message;
        });

         // Update Profile
        builder.addCase(updateUserAction.pending, (state, action) => {
          state.userLoading = true;
          state.userAppErr = undefined;
          state.userServerErr = undefined;
        });
        builder.addCase(resetUserUpdated, (state, action) => {
          state.isUpdated = true;
        });
        builder.addCase(updateUserAction.fulfilled, (state, action) => {
          state.userLoading = false;
          state.profileUpdated = action?.payload;
          state.userAppErr = undefined;
          state.userServerErr = undefined;
          state.isUpdated = false;
        });
        builder.addCase(updateUserAction.rejected, (state, action) => {
          state.userLoading = false;
          state.userAppErr = action?.payload?.message;
          state.userServerErr = action?.error?.message;
        });
    },
});

export default usersSlices.reducer;