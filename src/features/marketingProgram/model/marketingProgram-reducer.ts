import { createSlice } from '@reduxjs/toolkit'
import { loadMarcetingProgram } from '../index'

interface MarketingProgramState {
  marketingItem: {
    id: number
    name_string: string
    is_manual: number
    is_not_active: number
  }[]
  activeMarketingProgram: number
}

const marketingProgramReducer = createSlice({
  name: 'marketingProgramReducer',
  initialState: {
    marketingItem: [],
    activeMarketingProgram: -1,
  } as MarketingProgramState,
  reducers: {
    setActiveMarketingProgram(state, action: { payload: number }) {
      state.activeMarketingProgram = action.payload
    },
    setName_string_marketingPr(
      state,
      action: { payload: { id: number; name_string: string } }
    ) {
      state.marketingItem.find((item) => {
        return item.id === action.payload.id
      })!.name_string = action.payload.name_string
    },
    setIs_not_active_marketingPr(
      state,
      action: { payload: { id: number; is_not_active: number } }
    ) {
      state.marketingItem.find((item) => {
        return item.id === action.payload.id
      })!.is_not_active = action.payload.is_not_active
    },
    setIs_manual_marketingPr(
      state,
      action: { payload: { id: number; is_manual: number } }
    ) {
      state.marketingItem.find((item) => {
        return item.id === action.payload.id
      })!.is_manual = action.payload.is_manual
    },
    addmarketingItem(
      state,
      action: {
        payload: {
          id: number
          name_string: string
          is_manual: number
          is_not_active: number
        }
      }
    ) {
      state.marketingItem.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadMarcetingProgram.pending, (state, action) => {})

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    builder.addCase(loadMarcetingProgram.fulfilled, (state, action) => {
      state.marketingItem = action.payload.sort(
        (a: { id: number }, b: { id: number }) => {
          return a.id - b.id
        }
      )
    })
  },
})

export default marketingProgramReducer.reducer
export const {
  setActiveMarketingProgram,
  addmarketingItem,
  setName_string_marketingPr,
  setIs_not_active_marketingPr,
  setIs_manual_marketingPr,
} = marketingProgramReducer.actions
