import styles from './marketingProgram.module.scss'
import Search from '../../../shared/ui-kit/Search/Search'
import { clear, noclear, arm, check } from '../../../shared/icons/_index'
import { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import {
  loadMarcetingProgram,
  setActiveMarketingProgram,
  setActiveCategory,
  clearServicesInf,
  clearSettings,
} from '../index'
import classNames from 'classnames'

const MarketingProgram = () => {
  const dispatch = useAppDispatch()
  // функции для поиск (фильтр)
  const [searchValue, setSearchValue] = useState('')
  const [searchResults, setSearchResults] = useState<
    {
      id: number
      name_string: string
      is_manual: number
      is_not_active: number
    }[]
  >([])

  const marketingName = useAppSelector(
    (state) => state.marketingProgramReducer.marketingItem
  )

  const activeMarketingProgram = useAppSelector(
    (state) => state.marketingProgramReducer.activeMarketingProgram
  )

  function setActiveProgram(id: number, is_not_active: number) {
    if (is_not_active !== 1) {
      if (activeMarketingProgram === id) {
        dispatch(setActiveMarketingProgram(-1))
        //очищение всех полей
        dispatch(setActiveCategory(-1))
        dispatch(clearSettings())
      } else {
        console.log('id', id)
        dispatch(setActiveMarketingProgram(id))
        dispatch(setActiveCategory(-1))
      }
    }
  }

  const renderMarketingName = marketingName.map((item, index) => {
    return (
      <div
        className={classNames(
          item.is_not_active !== 1 ? styles.tableRow : styles.isNotActiveRow
        )}
        key={index}
        onClick={(e) => setActiveProgram(item.id, item.is_not_active)}
      >
        <div
          style={index % 2 === 1 ? { backgroundColor: '#c0e1c6' } : {}}
          className={classNames(
            item.id === activeMarketingProgram ? styles.active : {}
          )}
        >
          {item.name_string}
        </div>
        <div
          style={index % 2 === 1 ? { backgroundColor: '#c0e1c6' } : {}}
          className={classNames(
            styles.check,
            item.id === activeMarketingProgram ? styles.active : {}
          )}
        >
          {item.is_manual === 1 && <img width={10} height={10} src={check} />}
        </div>
      </div>
    )
  })

  const renderMarketingNameSeach = searchResults.map((item, index) => {
    return (
      <div
        className={classNames(styles.divSeach)}
        key={index}
        onClick={(e) => {
          setSearchValue('')
          setSearchResults([])
          setActiveProgram(item.id, item.is_not_active)
        }}
      >
        <div>{item.name_string}</div>
      </div>
    )
  })

  useEffect(() => {
    dispatch(loadMarcetingProgram())
  }, [])

  useEffect(() => {
    if (marketingName !== undefined) {
      if (searchValue !== '') {
        const results = marketingName.filter((item) => {
          return item.name_string.includes(searchValue)
        })
        setSearchResults(results)
      }
      // else {
      //   setSearchResults(marketingName);
      // }
    }
  }, [searchValue, marketingName])

  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <span className="header">Маркетинговые программы</span>
      </div>
      <div className={styles.search}>
        <Search
          placeholder="Маркетинговаяя программа"
          value={searchValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchValue(e.target.value)
          }}
        />
        <button className={styles.clear} onClick={() => setSearchValue('')}>
          {searchValue.length > 0 ? (
            <img src={clear} alt="" />
          ) : (
            <img src={noclear} alt="" />
          )}
        </button>
        {searchResults.length !== 0 && (
          <div className={styles.seachList}>{renderMarketingNameSeach}</div>
        )}
      </div>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <div>Название</div>
          <div className={styles.arm}>
            <img src={arm} alt="arm" />
          </div>
        </div>
        <div className={styles.tableBody}>{renderMarketingName}</div>
      </div>
    </div>
  )
}

export default MarketingProgram
