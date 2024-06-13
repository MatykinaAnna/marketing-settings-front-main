import { createSlice } from '@reduxjs/toolkit'
import { loadDC, loadUserRoles, loadMarketingActionUsage } from './thunks'
import { dcItem, userRoleItem } from 'shared/interfaces'
import { allSettings } from 'shared/interfaces'

const settings1Reducer = createSlice({
  name: 'settings1Reducer',
  initialState: {
    time_range: {
      start: '',
      end: '',
    },
    dc_list: [] as dcItem[],
    userRole_list: [] as userRoleItem[],
    dc_checked: [] as number[],
    userRole_checked: [] as number[],
    marketing_action: -1 as number,
  },
  reducers: {
    setDate(state, action) {
      if (action.payload.start !== undefined) {
        state.time_range.start = action.payload.start
      }
      if (action.payload.end !== undefined) {
        state.time_range.end = action.payload.end
      }
    },
    addDC(
      state,
      action: {
        payload: { id: number }
      }
    ) {
      state.dc_checked.push(action.payload.id)
    },
    delDC(
      state,
      action: {
        payload: { id: number }
      }
    ) {
      let index = state.dc_checked.findIndex((item) => {
        return item === action.payload.id
      })
      state.dc_checked.splice(index, 1)
    },

    clearDC(state) {
      state.dc_checked = []
    },
    clearUserRole(state) {
      state.userRole_checked = []
    },

    addUserRole(
      state,
      action: {
        payload: { id: number }
      }
    ) {
      state.userRole_checked.push(action.payload.id)
    },
    delUserRolel(
      state,
      action: {
        payload: { id: number }
      }
    ) {
      let index = state.userRole_checked.findIndex((item) => {
        return item === action.payload.id
      })
      state.userRole_checked.splice(index, 1)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      loadDC.fulfilled,
      (state, action: { payload: dcItem[] }) => {
        state.dc_list = action.payload.sort((a, b) => {
          return a.order_num - b.order_num
        })
      }
    )
    builder.addCase(
      loadUserRoles.fulfilled,
      (state, action: { payload: userRoleItem[] }) => {
        state.userRole_list = action.payload.sort((a, b) => {
          return a.order_num - b.order_num
        })
      }
    )
    builder.addCase(
      loadMarketingActionUsage.fulfilled,
      (state, action: { payload: allSettings }) => {
        state.dc_checked = action.payload.divisions
        state.userRole_checked = action.payload.user_roles
        state.marketing_action = action.payload.marketing_action
      }
    )
  },
})

export default settings1Reducer.reducer
export const {
  addDC,
  delDC,
  addUserRole,
  delUserRolel,
  clearDC,
  clearUserRole,
  setDate,
} = settings1Reducer.actions
