import { apiInstance } from '../../../shared/axios-instance'
import { createAsyncThunk } from '@reduxjs/toolkit'

const loadCategoris = createAsyncThunk(
  'categorisReducer/loadCategory',
  async () => {
    const categories = await apiInstance({
      method: 'get',
      url: `/api/v1/category`,
    }).then((res) => res.data)
    return categories
  }
)

export { loadCategoris }
