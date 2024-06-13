import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { loadMarcetingList } from './thunks'
import { marketingActionItem } from 'shared/interfaces'

const marketingListReducer = createSlice({
  name: 'marketingListReducer',
  initialState: {
    marketing_action_journal: [] as marketingActionItem[],
    activeMarcetingAction: null as number | null,
  },
  reducers: {
    addMarketingActionJournal(state, action) {
      state.marketing_action_journal.push(action.payload)
    },
    delMarketingActionJournal(state, action) {
      let index = state.marketing_action_journal.findIndex((item) => {
        return item.id === action.payload
      })
      state.marketing_action_journal.splice(index, 1)
    },
    updateMarketingActionJournal(state, action) {
      let ind = state.marketing_action_journal.findIndex((item) => {
        return item.id === action.payload.id
      })
      state.marketing_action_journal[ind] = action.payload
    },
    setActiveMarcetingAction(state, action) {
      state.activeMarcetingAction = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      loadMarcetingList.fulfilled,
      (state, action: { payload: marketingActionItem[] }) => {
        state.marketing_action_journal = action.payload.sort(
          (a, b) => a.id - b.id
        )
      }
    )
  },
})

export default marketingListReducer.reducer
export const {
  addMarketingActionJournal,
  setActiveMarcetingAction,
  updateMarketingActionJournal,
  delMarketingActionJournal,
} = marketingListReducer.actions
