import { apiInstance } from '../../../shared/axios-instance'
import { createAsyncThunk } from '@reduxjs/toolkit'

const loadService = createAsyncThunk(
  'serviceReducer/loadService',
  async (payload: { category_id: number; check: boolean }) => {
    const services = await apiInstance({
      method: 'get',
      url: `/api/v1/category/${payload.category_id}`,
    }).then((res) => res.data)
    return { services: services, check: payload.check }
  }
)

export { loadService }
