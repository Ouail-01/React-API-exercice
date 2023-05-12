import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await axios.get('https://randomuser.me/api/?results=10');
    return response.data.results;
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    isLoading: false,
    error: undefined,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => ({ ...state, isLoading: true }))
      .addCase(fetchUsers.fulfilled, (state, action) => ({
        ...state, isLoading: false, users: action.payload,
      }))
      .addCase(fetchUsers.rejected, (state, action) => ({
        ...state, isLoading: false, error: action.payload,
      }));
  },
});

export default usersSlice.reducer;
export const selectUsers = (state) => state.users.users;
export const selectIsLoading = (state) => state.users.isLoading;
export const selectError = (state) => state.users.error;
