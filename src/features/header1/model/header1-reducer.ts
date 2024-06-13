import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react-dom/test-utils'

const header1Reducer = createSlice({
  name: 'header1Reducer',
  initialState: {
    marketingProgram: -1,
    division: -1,
    author: '',
    current: false,
    startDate: null,
    endDate: null,
  },
  reducers: {
    setMarketingProgram(state, action) {
      state.marketingProgram = action.payload
    },
    seDivisionProgram(state, action) {
      state.division = action.payload
    },
    setAuthor(state, action) {
      state.author = action.payload
    },
    setCurrent(state, action) {
      state.current = action.payload
    },
    setStartDate(state, action) {
      state.startDate = action.payload
    },
    setEndDate(state, action) {
      state.endDate = action.payload
    },
  },
  extraReducers: (builder) => {},
})

export default header1Reducer.reducer
export const {
  setMarketingProgram,
  setAuthor,
  setCurrent,
  setStartDate,
  setEndDate,
  seDivisionProgram,
} = header1Reducer.actions
