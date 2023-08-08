import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  trelloData: [],
  error: '',
  isLoaded: false,
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.trelloData = action.payload;
      state.isLoaded = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addBoard: (state, action) => {
      state.trelloData.push(action.payload);
    },
  },
});

export const { setData, setError, addBoard } = boardSlice.actions;

export default boardSlice.reducer;
