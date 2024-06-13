import styles from './allServicesvices.module.scss'
import Search from '../../../shared/ui-kit/Search/Search'
import { arrow02, clear, noclear, max1 } from '../../../shared/icons/_index'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { useEffect, useState } from 'react'
import { setCheckService } from '../model/allServicesvices-reducer'
import { loadService, addAssortment, setCheckCategories } from '../index'
import classNames from 'classnames'

const AllServicesvices = () => {
  const dispatch = useAppDispatch()
  // функции для поиск (фильтр)
  const [searchValue, setSearchValue] = useState('')
  const [searchResults, setSearchResults] = useState<
    {
      product_kind_id: number
      product_item_id: number
      type: number
      check: boolean
      name: string
    }[]
  >([])

  const assortment = useAppSelector(
    (state) => state.settingsReducer.settingsForServer.assortment
  )

  const allServicesvicesInf = useAppSelector(
    (state) => state.allServicesvicesReducer.allServicesInf
  )
  const categories = useAppSelector(
    (state) => state.categoriesReducer.categoriesInf
  )
  const servicesInf = useAppSelector(
    (state) => state.servicesReducer.servicesInf
  )

  useEffect(() => {
    if (allServicesvicesInf !== undefined) {
      if (searchValue !== '') {
        const results = allServicesvicesInf.filter((item) => {
          return item.name.includes(searchValue)
        })
        setSearchResults(results)
      } else {
        setSearchResults(allServicesvicesInf)
      }
    }
  }, [searchValue, allServicesvicesInf])

  const activeCategory = useAppSelector(
    (state) => state.categoriesReducer.activeCategory
  )
  const settingsForServer = useAppSelector(
    (state) => state.settingsReducer.settingsForServer
  )

  function chengeCheckbox(item: {
    product_kind_id: number
    product_item_id: number
    type: number
    check: boolean
    name: string
  }) {
    dispatch(setCheckService({ id: item.product_item_id, value: !item.check }))
    if (!item.check === false) {
      console.log('снять галочку')
      dispatch(setCheckCategories({ id: item.product_kind_id, value: false }))
    }
  }

  const renderServiceInf = searchResults.map(
    (
      item: {
        product_kind_id: number
        product_item_id: number
        type: number
        check: boolean
        name: string
      },
      index: number
    ) => {
      return (
        <div
          className={styles.tableRow}
          style={index % 2 === 1 ? { backgroundColor: '#c0e1c6' } : {}}
          key={index}
        >
          <input
            type="checkbox"
            checked={item.check}
            onChange={(e) => chengeCheckbox(item)}
          />
          <span
            className={item.type > 1 ? styles.child : ''}
            onClick={(e) => chengeCheckbox(item)}
          >
            {item.name}
          </span>
        </div>
      )
    }
  )

  function clickBtnOk() {
    allServicesvicesInf.forEach((item) => {
      if (item.check) {
        if (
          assortment.find((item1) => {
            return item1.product_item_id === item.product_item_id
          }) === undefined
        ) {
          dispatch(
            addAssortment({
              product_kind_id: item.product_kind_id,
              product_item_id: item.product_item_id,
              name: item.name,
            })
          )
        }
      }
    })
  }

  useEffect(() => {
    categories.find((item) => {
      return item.id === activeCategory
    })
    if (activeCategory !== -1) {
      dispatch(
        loadService({
          category_id: activeCategory,
          check: categories.find((item) => {
            return item.id === activeCategory
          })!.check,
        })
      )
    }
  }, [activeCategory])

  useEffect(() => {
    //установить галочки у услуг, которым назначена выбранная маркетинговая программа
    if (settingsForServer.assortment !== undefined) {
      settingsForServer.assortment.forEach((item) => {
        if (activeCategory === item.product_kind_id) {
          dispatch(setCheckService({ id: item.product_item_id, value: true }))
        }
      })
    }
  }, [allServicesvicesInf])

  return (
    <>
      {activeCategory !== -1 ? (
        <div className={styles.body}>
          <div className={styles.firstRow}>
            <button className={styles.btnOk} onClick={(e) => clickBtnOk()}>
              <div className={styles.img}></div>
              <span>OK</span>
            </button>
            <div className={styles.search}>
              <Search
                placeholder="Услуга"
                value={searchValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSearchValue(e.target.value)
                }}
              />
            </div>

            <button className={styles.clear} onClick={() => setSearchValue('')}>
              {searchValue.length > 0 ? (
                <img src={clear} alt="" />
              ) : (
                <img src={noclear} alt="" />
              )}
            </button>
          </div>

          <div className={styles.table}>
            <div className={styles.tableHeader}>
              <div>Название</div>
            </div>
            <div className={styles.tableBody}>{renderServiceInf}</div>
          </div>
        </div>
      ) : (
        <>{<img src={max1} alt="" />}</>
      )}
    </>
  )
}

export default AllServicesvices
