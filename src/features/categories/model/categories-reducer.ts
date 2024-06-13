import { createSlice } from '@reduxjs/toolkit'
import { error } from 'console'
import { loadCategoris } from './thunks'

interface categoriesState {
  categoriesInf: {
    id: number
    name: string
    check: boolean
    order_num: number
  }[]
  activeCategory: number
}

const categoriesReducer = createSlice({
  name: 'categoriesReducer',
  initialState: {
    categoriesInf: [],
    activeCategory: -1,
  } as categoriesState,
  reducers: {
    setCheckCategories(
      state,
      action: { payload: { id: number; value: boolean } }
    ) {
      let categorie = state.categoriesInf.find((item) => {
        return item.id === action.payload.id
      })
      if (categorie !== undefined) {
        categorie.check = action.payload.value
      } else {
        console.log('нет такой categorie')
      }
    },
    setActiveCategory(state, actions) {
      state.activeCategory = actions.payload
    },
    clearCheckCategoriesInf(state) {
      state.categoriesInf.forEach((item) => {
        item.check = false
      })
    },
  },
  extraReducers: (builder) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    builder.addCase(
      loadCategoris.fulfilled,
      (
        state,
        action: { payload: { id: number; order_num: number; name: string }[] }
      ) => {
        let rez = action.payload.map((item) => {
          return { ...item, check: false }
        })
        state.categoriesInf = rez.sort((a, b) => a.order_num - b.order_num)
      }
    )
  },
})

export default categoriesReducer.reducer
export const {
  setCheckCategories,
  setActiveCategory,
  clearCheckCategoriesInf,
} = categoriesReducer.actions
