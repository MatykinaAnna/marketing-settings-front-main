import { configureStore, createSlice } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import marketingProgramReducer from '../features/marketingProgram/model/marketingProgram-reducer'
import servicesReducer from '../features/services/model/services-reducer'
import categoriesReducer from '../features/categories/model/categories-reducer'
import allServicesvicesReducer from '../features/allServicesvices/model/allServicesvices-reducer'
import settingsReducer from '../features/settings/model/settings-reducer'
import publicReducer from '../processes/model/processes-reducer'
import setting1Reducer from '../features/settings1/model/setting1-reducer'
import marketingListReducer from 'features/marketingList/model/marketingList-reducer'
import header1Reducer from 'features/header1/model/header1-reducer'

export const rootReducer = combineReducers({
  marketingProgramReducer: marketingProgramReducer,
  servicesReducer: servicesReducer,
  categoriesReducer: categoriesReducer,
  allServicesvicesReducer: allServicesvicesReducer,
  settingsReducer: settingsReducer,
  publicReducer: publicReducer,
  setting1Reducer: setting1Reducer,
  marketingListReducer: marketingListReducer,
  header1Reducer: header1Reducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
