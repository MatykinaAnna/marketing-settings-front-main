import { loadCategoris } from './model/thunks'
import {
  setCheckCategories,
  setActiveCategory,
  clearCheckCategoriesInf,
} from './model/categories-reducer'
import { addServicesInf } from '../services'
import { setCheckService } from '../allServicesvices/model/allServicesvices-reducer'
import { loadService } from '../allServicesvices'
export {
  loadCategoris,
  setCheckCategories,
  setActiveCategory,
  setCheckService,
  addServicesInf,
  loadService,
  clearCheckCategoriesInf,
}
