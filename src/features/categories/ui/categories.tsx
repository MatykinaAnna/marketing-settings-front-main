import classNames from 'classnames'
import styles from './categories.module.scss'
import { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import {
  setCheckCategories,
  setActiveCategory,
  loadCategoris,
  setCheckService,
  addServicesInf,
  loadService,
  clearCheckCategoriesInf,
} from '../index'

const Categories = () => {
  const dispatch = useAppDispatch()
  const categoriesInf = useAppSelector(
    (state) => state.categoriesReducer.categoriesInf
  )
  const activeCategory = useAppSelector(
    (state) => state.categoriesReducer.activeCategory
  )
  const allServicesInf = useAppSelector(
    (state) => state.allServicesvicesReducer.allServicesInf
  )

  const activeMarketingProgram = useAppSelector(
    (state) => state.marketingProgramReducer.activeMarketingProgram
  )

  const [checked, setChecked] = useState(false)

  useEffect(() => {
    dispatch(loadCategoris())
  }, [])

  useEffect(() => {
    dispatch(clearCheckCategoriesInf())
  }, [activeMarketingProgram])

  function chengeAllCheckbox() {
    setChecked(!checked)
    categoriesInf.forEach(
      (item: { id: number; name: string; check: boolean }) => {
        dispatch(setCheckCategories({ id: item.id, value: !checked }))
      }
    )
    allServicesInf.forEach((item1) => {
      dispatch(setCheckService({ id: item1.product_item_id, value: !checked }))
    })
  }

  function chengeCheckbox(item: {
    id: number
    name: string
    check: boolean
    order_num: number
  }) {
    dispatch(setCheckCategories({ id: item.id, value: !item.check }))
    allServicesInf.forEach((item1) => {
      if (item1.product_kind_id === item.id) {
        dispatch(
          setCheckService({ id: item1.product_item_id, value: !item.check })
        )
      }
    })
  }

  function clickCategorie(item: {
    id: number
    name: string
    check: boolean
    order_num: number
  }) {
    dispatch(setActiveCategory(item.id))
  }

  const renderCategoriesInf = categoriesInf.map(
    (
      item: { id: number; name: string; check: boolean; order_num: number },
      index: number
    ) => {
      return (
        <div
          className={classNames(
            styles.tableRow,
            item.id === activeCategory ? styles.active : {}
          )}
          style={index % 2 === 1 ? { backgroundColor: '#c0e1c6' } : {}}
          key={index}
        >
          <input
            type="checkbox"
            checked={item.check}
            onChange={(e) => chengeCheckbox(item)}
          />
          <span onClick={(e) => clickCategorie(item)}>{item.name}</span>
        </div>
      )
    }
  )

  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <span className="header">Категории</span>
      </div>

      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <div>Название</div>
        </div>
        <div className={styles.tableBody}>
          <div className={styles.tableRowAll}>
            <input
              type="checkbox"
              checked={checked}
              onChange={chengeAllCheckbox}
            />
            <span onClick={chengeAllCheckbox}>Для всех категорий</span>
          </div>
          {renderCategoriesInf}
        </div>
      </div>
    </div>
  )
}

export default Categories
