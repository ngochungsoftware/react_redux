import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// First, create the thunk
export const fetchListUsers = createAsyncThunk(
  "users/fetchListUsers",
  async () => {
    const res = await fetch("http://localhost:4000/users");
    const data = await res.json();
    return data;
  }
);

interface IUserPayload {
  email: string;
  name: string;
}
export const createNewUser = createAsyncThunk(
  "users/createNewUser",
  async (payload: IUserPayload, thunkAPI) => {
    const res = await fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...payload }),
    });
    const data = await res.json();
    if (data && data.id) {
      // create successfully
      thunkAPI.dispatch(fetchListUsers());
    }
    return data;
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (payload: any, thunkAPI) => {
    const res = await fetch(`http://localhost:4000/users/${payload.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: payload.email,
        name: payload.name,
      }),
    });
    const data = await res.json();
    if (data && data.id) {
      // create successfully
      thunkAPI.dispatch(fetchListUsers());
    }
    return data;
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (payload: any, thunkAPI) => {
    const res = await fetch(`http://localhost:4000/users/${payload.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    thunkAPI.dispatch(fetchListUsers());
    return data;
  }
);

interface IUser {
  name: string;
  email: string;
  id: number;
}

const initialState: {
  listUsers: IUser[];
  isCreateSuccess: boolean;
  isUpdateSuccess: boolean;
  isDeleteSuccess: boolean;
} = {
  listUsers: [],
  isCreateSuccess: false,
  isUpdateSuccess: false,
  isDeleteSuccess: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetCreate(state) {
      state.isCreateSuccess = false;
    },
    resetUpdate(state) {
      state.isUpdateSuccess = false;
    },
    resetDelete(state) {
      state.isUpdateSuccess = false;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchListUsers.fulfilled, (state, action) => {
      // Add user to the state array
      state.listUsers = action.payload;
    });
    builder.addCase(createNewUser.fulfilled, (state, action) => {
      // Add user to the state array
      state.isCreateSuccess = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      // Add user to the state array
      state.isUpdateSuccess = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      // Add user to the state array
      state.isDeleteSuccess = true;
    });
  },
});

// Action creators are generated for each case reducer function
export const { resetCreate, resetUpdate, resetDelete } = userSlice.actions;

export default userSlice.reducer;
