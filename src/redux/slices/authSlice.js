import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  email: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
    clearEmail(state) {
      state.email = null;
    },
  },
});

export const {setEmail, clearEmail} = authSlice.actions;

export default authSlice.reducer;
