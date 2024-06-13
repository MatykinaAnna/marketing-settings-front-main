import { createSlice } from '@reduxjs/toolkit'
import { loadSettings } from './thunks'
import { stat } from 'fs'

interface settingsState {
  settingsForServer: {
    id: number
    assortment: {
      product_kind_id: number
      product_item_id: number
      name: string
    }[]
    name_string: string
    description: string
    is_not_active: number
    is_manual: number
    discount_value_percent: number
    formula: string
    is_simple: number
  }
  loadSettingsStatus: string
}

const settingsmReducer = createSlice({
  name: 'settingsmReducer',
  initialState: {
    settingsForServer: {
      id: -1,
      assortment: [],
      name_string: '',
      description: '',
      is_not_active: 1,
      is_manual: 0,
      discount_value_percent: 0,
      formula: '',
      is_simple: 1,
    },
    loadSettingsStatus: '',
  } as settingsState,
  reducers: {
    clearSettings(state) {
      state.settingsForServer.id = -1
      state.settingsForServer.assortment = []
      state.settingsForServer.name_string = ''
      state.settingsForServer.description = ''
      state.settingsForServer.is_not_active = 1
      state.settingsForServer.is_manual = 0
      state.settingsForServer.discount_value_percent = 0
      state.settingsForServer.formula = ''
      state.settingsForServer.is_simple = 1
    },

    setId(state, action) {
      state.settingsForServer.id = action.payload
    },

    setName(state, action) {
      state.settingsForServer.name_string = action.payload
    },

    setDiscount(state, action) {
      state.settingsForServer.discount_value_percent = action.payload
    },

    setIs_not_active(state, action) {
      state.settingsForServer.is_not_active = Number(!action.payload)
    },

    setIs_manual(state, action) {
      state.settingsForServer.is_manual = Number(action.payload)
    },

    setDescription(state, action) {
      state.settingsForServer.description = action.payload
    },

    delAssortment(
      state,
      actions: {
        payload: {
          product_item_id: number
        }
      }
    ) {
      let index = state.settingsForServer.assortment.findIndex((item) => {
        return item.product_item_id === actions.payload.product_item_id
      })

      console.log('index', index)

      state.settingsForServer.assortment.splice(index, 1)
    },
    addAssortment(
      state,
      action: {
        payload: {
          product_kind_id: number
          product_item_id: number
          name: string
        }
      }
    ) {
      state.settingsForServer.assortment.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadSettings.pending, (state, action) => {
      state.loadSettingsStatus = 'pending'
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    builder.addCase(loadSettings.fulfilled, (state, action) => {
      state.settingsForServer = action.payload
      state.loadSettingsStatus = 'fulfilled'
    })
  },
})

export default settingsmReducer.reducer
export const {
  clearSettings,
  delAssortment,
  addAssortment,
  setName,
  setDiscount,
  setIs_not_active,
  setIs_manual,
  setDescription,
  setId,
} = settingsmReducer.actions
