import { apiInstance } from '../../../shared/axios-instance'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { marketingActionItem } from 'shared/interfaces'

const loadMarcetingList = createAsyncThunk(
  'marcetingListReducer/loadMarcetingProgram',
  async (data: number) => {
    const marcetingList = await apiInstance({
      method: 'get',
      url: `/api/v1/marketing_action_journal?company_group_id=${data}`,
    }).then((res) => res.data)
    return marcetingList
  }
)

export { loadMarcetingList }
