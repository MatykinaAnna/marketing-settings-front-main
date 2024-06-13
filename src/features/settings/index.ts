import { loadSettings } from './model/thunks'
import {
  setName,
  setDiscount,
  setIs_not_active,
  setIs_manual,
  setDescription,
  setId,
  addAssortment,
} from './model/settings-reducer'
import { addmarketingItem } from '../marketingProgram/model/marketingProgram-reducer'
import {
  setActiveMarketingProgram,
  setIs_manual_marketingPr,
  setIs_not_active_marketingPr,
  setName_string_marketingPr,
} from '../marketingProgram/model/marketingProgram-reducer'
import { clearSettings } from './model/settings-reducer'

export {
  loadSettings,
  setName,
  setDiscount,
  setIs_not_active,
  setIs_manual,
  setDescription,
  setId,
  addmarketingItem,
  setActiveMarketingProgram,
  setIs_manual_marketingPr,
  setIs_not_active_marketingPr,
  setName_string_marketingPr,
  addAssortment,
  clearSettings,
}
