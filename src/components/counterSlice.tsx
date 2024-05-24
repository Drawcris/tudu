// src/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    setCount: (state, action) => action.payload
  }
});

export const { setCount } = counterSlice.actions;
export default counterSlice.reducer;
