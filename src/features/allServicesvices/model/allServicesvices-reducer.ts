import { createSlice } from '@reduxjs/toolkit'
import { loadService } from '../index'

interface allServicesState {
  allServicesInf: {
    product_kind_id: number
    product_item_id: number
    name: string
    type: number
    check: boolean
  }[]
}

const allServicesReducer = createSlice({
  name: 'allServicesReducer',
  initialState: {
    allServicesInf: [],
  } as allServicesState,
  reducers: {
    setCheckService(
      state,
      action: { payload: { id: number; value: boolean } }
    ) {
      let service = state.allServicesInf.find((item) => {
        return item.product_item_id === action.payload.id
      })
      if (service !== undefined) {
        service.check = action.payload.value
      } else {
        console.log('нет такого service')
      }
    },
  },
  extraReducers: (builder) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    builder.addCase(
      loadService.fulfilled,
      (
        state,
        action: {
          payload: {
            services: {
              product_kind_id: number
              product_item_id: number
              name: string
            }[]
            check: boolean
          }
        }
      ) => {
        state.allServicesInf = action.payload.services.map((item) => {
          return { ...item, type: 1, check: action.payload.check }
        })
      }
    )
  },
})

export default allServicesReducer.reducer
export const { setCheckService } = allServicesReducer.actions
