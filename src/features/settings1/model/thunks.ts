import { apiInstance } from '../../../shared/axios-instance';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { dcItem } from 'shared/interfaces';

const loadDC = createAsyncThunk(
  'settings1Reducer/loadDC',
  async (company_group_id: number) => {
    const listDC = await apiInstance({
      method: 'get',
      url: `/api/v1/divisions?company_group_id=${company_group_id}`,
    }).then((res) => res.data);
    return listDC;
  }
);

const loadUserRoles = createAsyncThunk(
  'settings1Reducer/loadUserRoles',
  async (company_group_id: number) => {
    const listUserRoles = await apiInstance({
      method: 'get',
      url: `/api/v1/user_roles`,
    }).then((res) => res.data);
    return listUserRoles;
  }
);

const loadMarketingActionUsage = createAsyncThunk(
  'settingsReducer/loadSettings',
  async (id: number) => {
    const settings = await apiInstance({
      method: 'get',
      url: `/api/v1/marketing_action_usage/${id}`,
    }).then((res) => res.data);
    return settings;
  }
);

export { loadUserRoles, loadDC, loadMarketingActionUsage };
