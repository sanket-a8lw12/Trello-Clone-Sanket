import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    listBoard: [],
    cardName: '',
  };

  const cardSlice = createSlice({
    name: "card",
    initialState,
    reducers: {
        setListBoard: (state, action) =>{
            state.listBoard = action.payload
        },
        setCardName: (state, action) => {
            state.cardName = action.payload;
        },
        addListBoard : (state, action) => {
            state.listBoard.push(action.payload);
        }
    }
  })

  export const { setListBoard, setCardName, addListBoard} = cardSlice.actions;
  
  export default cardSlice.reducer;