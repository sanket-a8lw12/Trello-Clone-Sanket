import { configureStore } from '@reduxjs/toolkit'
import boardSlice from './boardSlice'
import cardSlice from './cardSlice'

export const store = configureStore({
  reducer: {
    board : boardSlice,
    card : cardSlice
  },
})