import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

import axiosInstance from '../../helpers/axiosInstance.js';

const initialState = {
  allUserCount: 0,
  subscribedCount: 0
};

export const getStatsData = createAsyncThunk('/stats/get', async () => {
  try {
    const res = axiosInstance.get('/admin/stats/users');

    toast.promise(res, {
      loading: 'loading user data',
      success: (data) => {
        return data?.data?.message;
      },
      error: 'Error while fetching user data'
    });

    return (await res)?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStatsData.fulfilled, (state, action) => {
      console.log('statsdata', action);
      (state.allUserCount = action?.payload?.data?.allUsersCount),
        (state.subscribedCount = action?.payload?.data?.subscribedUsersCount);
    });
  }
});

export default statsSlice.reducer;
