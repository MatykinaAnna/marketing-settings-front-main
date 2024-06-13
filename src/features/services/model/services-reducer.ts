import { createSlice } from '@reduxjs/toolkit'

interface servicesState {
  servicesInf: { id: number; servicesName: string; servicesType: number }[]
  activeService: number
}

const servicesmReducer = createSlice({
  name: 'servicesmReducer',
  initialState: {
    servicesInf: [],
    activeService: -1,
  } as servicesState,
  reducers: {
    addServicesInf(
      state,
      action: {
        payload: { id: number; servicesName: string; servicesType: number }
      }
    ) {
      state.servicesInf.push(action.payload)
    },

    clearServicesInf(state) {
      state.servicesInf = []
    },

    setActiveService(state, action: { payload: { id: number } }) {
      state.activeService = action.payload.id
    },
  },
  extraReducers: (builder) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    builder
  },
})

export default servicesmReducer.reducer
export const { addServicesInf, clearServicesInf, setActiveService } =
  servicesmReducer.actions
