import { loadSettings } from 'features/settings/model/thunks'
import { loadDC, loadMarketingActionUsage } from './model/thunks'
import {
  addDC,
  delDC,
  addUserRole,
  delUserRolel,
  setDate,
  clearDC,
  clearUserRole,
} from './model/setting1-reducer'
import {
  addMarketingActionJournal,
  updateMarketingActionJournal,
  delMarketingActionJournal,
} from 'features/marketingList/model/marketingList-reducer'
export {
  loadSettings,
  loadDC,
  addDC,
  delDC,
  addUserRole,
  delUserRolel,
  addMarketingActionJournal,
  loadMarketingActionUsage,
  updateMarketingActionJournal,
  delMarketingActionJournal,
  setDate,
  clearDC,
  clearUserRole,
}
