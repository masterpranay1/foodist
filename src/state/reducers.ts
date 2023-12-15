import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface ILoginInitialState {
  mobileNumber: string;
  otp: string;
  status: string;
  otpSendStatus: string;
  otpBufferTime: number;
  email: string;
  name: string;
}

const loginInitialState: ILoginInitialState = {
  mobileNumber: "",
  otp: "",
  status: "",
  otpSendStatus: "not-sent",
  otpBufferTime: 0,
  email: "",
  name: "",
};

export const sendOtp = createAsyncThunk(
  "sendOtp",
  async (
    data: {
      mobileNumber: string;
      otp: string;
    },
    thunkAPI
  ) => {
    try {
      // TODO : create a service to send otp
      await new Promise((resolve) => {
        setTimeout(() => {
          thunkAPI.dispatch(setLoginOtp(data.otp));
          thunkAPI.dispatch(setLoginmobileNumber(data.mobileNumber));
          thunkAPI.dispatch(setOtpBufferTime(60));
          resolve({ status: "success" });
        }, 4000);
      });
      return { status: "success" };
    } catch (error) {
      return thunkAPI.rejectWithValue("Error Sending OTP");
    }
  }
);

const loginSlice = createSlice({
  name: "SET_LOGIN_PHONE_NUMBER",
  initialState: loginInitialState,
  reducers: {
    setLoginmobileNumber: (state, action) => {
      return { ...state, mobileNumber: action.payload };
    },
    setLoginOtp: (state, action) => {
      return { ...state, otp: action.payload };
    },
    setLoginStatus: (state, action) => {
      return { ...state, status: action.payload };
    },
    setOtpBufferTime: (state, action) => {
      return { ...state, otpBufferTime: action.payload };
    },
    setEmail: (state, action) => {
      return { ...state, email: action.payload };
    },
    setName: (state, action) => {
      return { ...state, name: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendOtp.pending, (state, action) => {
      return { ...state, otpSendStatus: "pending" };
    });
    builder.addCase(sendOtp.fulfilled, (state, action) => {
      return { ...state, otpSendStatus: "success" };
    });
    builder.addCase(sendOtp.rejected, (state, action) => {
      return { ...state, otpSendStatus: "failed" };
    });
  },
});

export const {
  setLoginmobileNumber,
  setLoginOtp,
  setLoginStatus,
  setOtpBufferTime,
  setEmail,
  setName,
} = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
