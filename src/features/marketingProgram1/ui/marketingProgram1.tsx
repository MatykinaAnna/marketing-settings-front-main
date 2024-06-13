import styles from './marketingProgram1.module.scss'
import Search from '../../../shared/ui-kit/Search/Search'
import { loadMarcetingProgram } from '../index'
import {
  clear,
  noclear,
  arm,
  check,
  greenDel,
} from '../../../shared/icons/_index'
import { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import classNames from 'classnames'
import { setActiveMarketingProgram } from 'features/marketingProgram'

//@ts-ignore
const MarketingProgram1 = ({ clickClose, clickOK }) => {
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
  const marketingItem = useAppSelector(
    (state) => state.marketingListReducer.marketing_action_journal
  )
  const activeMarketingProgram = useAppSelector(
    (state) => state.marketingProgramReducer.activeMarketingProgram
  )

  const handleChange = () => {
    clickClose() // callback-функция
  }

  const clickOKChild = () => {
    clickOK()
  }

  useEffect(() => {
    dispatch(loadMarcetingProgram())
  }, [])

  useEffect(() => {
    if (marketingName !== undefined) {
      if (searchValue !== '') {
        const result = marketingName.filter((item) => {
          return item.name_string.includes(searchValue)
        })
        setSearchResults(result)
      } else {
        console.log(marketingName)
        setSearchResults(marketingName)
      }
    }
  }, [searchValue, marketingName])

  function clickMarketingProgram(item: {
    id: number
    name_string: string
    is_manual: number
    is_not_active: number
  }) {
    if (item.is_not_active !== 1) {
      dispatch(setActiveMarketingProgram(item.id))
    }
  }

  const renderMarketingName = searchResults.map((item, index) => {
    return (
      <div
        className={classNames(
          item.is_not_active !== 1 ? styles.tableRow : styles.isNotActiveRow,
          item.id === activeMarketingProgram ? styles.active : ''
        )}
        style={index % 2 === 1 ? { backgroundColor: '#c0e1c6' } : {}}
        key={index}
        onClick={() => {
          clickMarketingProgram(item)
        }}
      >
        <div>{item.name_string}</div>
        <div></div>
        <div className={classNames(styles.check)}>
          {item.is_manual === 1 && <img width={10} height={10} src={check} />}
        </div>
      </div>
    )
  })

  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <span style={{ paddingLeft: '2px' }} className="header">
          Маркетинговые программы
        </span>
        <button disabled={activeMarketingProgram === -1} onClick={clickOKChild}>
          <span>OK</span>
        </button>
        <img
          className={styles.btnClose}
          onClick={handleChange}
          height={20}
          width={20}
          src={greenDel}
          alt=""
        />
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
      </div>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <div>Название</div>
          <div></div>
          <div className={styles.arm}>
            <img src={arm} alt="arm" />
          </div>
        </div>
        <div className={styles.tableBody}>{renderMarketingName}</div>
      </div>
    </div>
  )
}

export default MarketingProgram1
