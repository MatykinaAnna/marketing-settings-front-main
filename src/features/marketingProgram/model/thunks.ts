import { apiInstance } from '../../../shared/axios-instance'
import { createAsyncThunk } from '@reduxjs/toolkit'

const loadMarcetingProgram = createAsyncThunk(
  'marcetingProgramReducer/loadMarcetingProgram',
  async () => {
    const marcetingPrograms = await apiInstance({
      method: 'get',
      url: `/api/v1/marketing_programs/`,
    }).then((res) => res.data)
    return marcetingPrograms
  }
)

export { loadMarcetingProgram }
