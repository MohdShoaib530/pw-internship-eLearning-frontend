import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

import axiosInstance from '../../helpers/axiosInstance.js';

const initialState = {
  key: '',
  subscription_id: '',
  isPaymentVerified: false,
  allPayments: {},
  finalMonths: {},
  monthlySalesRecord: []
};

export const getRazorpayKey = createAsyncThunk(
  'razorpay/getRazorpayKey',
  async () => {
    try {
      const res = axiosInstance.get('/payment/razorpay-key');
      return (await res)?.data;
    } catch (error) {
      console.log('error', error);
      toast.error(error?.response?.data?.message);
    }
  }
);

export const getRazorpaySubsId = createAsyncThunk(
  'razorpay/getRazorpaySubsId',
  async () => {
    try {
      const res = axiosInstance.post('/payment/subscribe');
      return (await res)?.data;
    } catch (error) {
      console.log('error', error);
      toast.error(error?.response?.data?.message);
    }
  }
);

export const paymentVerify = createAsyncThunk(
  '/payment/verify',
  async (data) => {
    console.log('paymentdata', data);
    try {
      const res = axiosInstance.post('/payment/verify', {
        razorpay_payment_id: data.razorpay_payment_id,
        razorpay_subscription_id: data.razorpay_subscription_id,
        razorpay_signature: data.razorpay_signature
      });
      toast.promise(res, {
        loading: 'Verifying Payment...',
        success: 'Payment Verified',
        error: 'Payment Verification Failed'
      });
      return (await res)?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);
export const cancelSubscription = createAsyncThunk(
  '/subscription/cancel',
  async () => {
    try {
      const res = axiosInstance.post('/payment/unsubscribe');
      toast.promise(res, {
        loading: 'Cancelling Subscription...',
        success: (data) => {
          return data?.data?.message;
        },
        error: (err) => {
          return err?.response?.data?.message;
        }
      });
      return (await res)?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);
export const getPaymentRecord = createAsyncThunk(
  '/payments/record',
  async () => {
    try {
      const response = axiosInstance.get('/payment?count=100');
      toast.promise(response, {
        loading: 'Getting the payment records',
        success: (data) => {
          return data?.data?.message;
        },
        error: 'Failed to get payment records'
      });
      return (await response).data;
    } catch (error) {
      toast.error('Operation failed');
    }
  }
);

const rezorpaySlice = createSlice({
  name: 'razorpay',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRazorpayKey.fulfilled, (state, action) => {
        console.log('rake', action.payload);
        state.key = action?.payload?.data;
      })
      .addCase(getRazorpaySubsId.fulfilled, (state, action) => {
        console.log('rasubs', action.payload);
        state.subscription_id = action?.payload?.data;
      })
      .addCase(paymentVerify.fulfilled, (state, action) => {
        console.log(action);
        toast.success(action?.payload?.message);
        state.isPaymentVerified = action?.payload?.success;
      })
      .addCase(paymentVerify.rejected, (state, action) => {
        console.log(action);
        toast.success(action?.payload?.message);
        state.isPaymentVerified = action?.payload?.success;
      })
      .addCase(getPaymentRecord.fulfilled, (state, action) => {
        state.allPayments = action?.payload?.allPayments;
        state.finalMonths = action?.payload?.finalMonths;
        state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
      });
  }
});

export default rezorpaySlice.reducer;
