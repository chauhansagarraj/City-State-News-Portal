import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/axios";

const token = localStorage.getItem("token");

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: token || null,
  loading: false,
  isAuthenticated: !!token,
  error: null,
  message: null,
};

// REGISTER
export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData, thunkAPI) => {
    try {
      const res = await API.post("/auth/register", formData);

      localStorage.setItem("token", res.data.token);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue( error.response?.data?.message || "Registration failed");
    }
  },
);

// LOGIN
export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData, thunkAPI) => {
    try {
      const res = await API.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue( error.response?.data?.message || "Login failed");
    }
  },
);

// CHANGE PASSWORD
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (formData, thunkAPI) => {
    try {
      const res = await API.put("/auth/change-password", formData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue( error.response?.data?.message || "Change password failed");
    }
  },
);



const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
        state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.isAuthenticated = false;
    },
  },


  extraReducers: (builder) => {
    builder

      // LOGIN
      .addCase(loginUser.pending, (state) => {
    state.loading = true;
      state.error = null;
      state.message = null;      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
         state.user = action.payload.user;
        state.isAuthenticated = true;
       localStorage.setItem("token", action.payload.token);
  localStorage.setItem("user", JSON.stringify(action.payload.user));
        state.message = action.payload.message; // success message
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // REGISTER

        .addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    })

      .addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
       state.user = action.payload.user;
    localStorage.setItem("token", action.payload.token);
  localStorage.setItem("user", JSON.stringify(action.payload.user));
      state.isAuthenticated = true;

      state.message = action.payload.message; // success message
      })

        .addCase(registerUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })

      // CHANGE PASSWORD
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        state.message = "Password changed successfully";
      })

      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    }
     
    
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
