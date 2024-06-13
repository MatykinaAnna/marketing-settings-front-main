import { apiInstance } from '../../../shared/axios-instance';
import { createAsyncThunk } from '@reduxjs/toolkit';

const loadSettings = createAsyncThunk(
  'settingsrReduser/loadSettings',
  async (marketing_program_id: number) => {
    const settings = await apiInstance({
      method: 'get',
      url: `/api/v1/marketing_program/${marketing_program_id}`,
    }).then((res) => res.data);
    return settings;
  }
);

export { loadSettings };
