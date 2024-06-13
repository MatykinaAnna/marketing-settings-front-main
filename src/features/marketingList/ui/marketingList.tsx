import classNames from 'classnames'
import styles from './marketingList.module.scss'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { loadMarcetingList, setActiveMarcetingAction } from '../index'
import { AsyncThunkAction } from '@reduxjs/toolkit'
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { marketingActionItem } from 'shared/interfaces'
import setting1Reducer from 'features/settings1/model/setting1-reducer'
import { i } from '../../../shared/icons/_index'
import { loadSettings } from 'features/settings'

export const MarketingList = () => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()

  const marketingList = useAppSelector(
    (state) => state.marketingListReducer.marketing_action_journal
  )

  const activeMarcetingAction = useAppSelector(
    (state) => state.marketingListReducer.activeMarcetingAction
  )

  const dcList = useAppSelector((state) => state.setting1Reducer.dc_list)

  const [marketingListFilter, setMarketingListFilter] =
    useState<marketingActionItem[]>(marketingList)

  useEffect(() => {
    setMarketingListFilter(marketingList)
  }, [marketingList])

  const startDate = useAppSelector((state) => state.header1Reducer.startDate)
  const endDate = useAppSelector((state) => state.header1Reducer.endDate)
  const divisionId = useAppSelector((state) => state.header1Reducer.division)
  const marcProgramId = useAppSelector(
    (state) => state.header1Reducer.marketingProgram
  )
  const current = useAppSelector((state) => state.header1Reducer.current)
  const author = useAppSelector((state) => state.header1Reducer.author)
  const marketingProgram = useAppSelector(
    (state) => state.marketingProgramReducer.marketingItem
  )
  const description = useAppSelector(
    (state) => state.settingsReducer.settingsForServer.description
  )

  useEffect(() => {
    if (startDate !== null) {
      let r = marketingList.filter((item) => {
        return new Date(item.date_since) >= new Date(startDate)
      })
      setMarketingListFilter(r)
    } else {
      setMarketingListFilter(marketingList)
    }
  }, [startDate])

  useEffect(() => {
    if (current) {
      let r = marketingList.filter((item) => {
        return new Date(item.date_to) >= new Date()
      })
      setMarketingListFilter(r)
    } else {
      setMarketingListFilter(marketingList)
    }
  }, [current])

  useEffect(() => {
    let name = dcList.find((item) => {
      return item.id === divisionId
    })?.name

    console.log(name)
    if (name !== undefined) {
      let r = marketingList.filter((item) => {
        let str = divisionsToString(item.divisions)
        return str.includes(name!)
      })
      setMarketingListFilter(r)
    } else {
      setMarketingListFilter(marketingList)
    }
  }, [divisionId])

  useEffect(() => {
    let nameMarcProg = marketingProgram.find((item) => {
      return item.id === marcProgramId
    })?.name_string
    if (nameMarcProg !== undefined) {
      let r = marketingList.filter((item) => {
        return item.marketing_action_name === nameMarcProg
      })
      setMarketingListFilter(r)
    } else {
      setMarketingListFilter(marketingList)
    }
  }, [marcProgramId])

  useEffect(() => {
    if (endDate !== null) {
      let r = marketingList.filter((item) => {
        return new Date(item.date_to) <= new Date(endDate)
      })
      setMarketingListFilter(r)
    } else {
      setMarketingListFilter(marketingList)
    }
  }, [endDate])

  useEffect(() => {
    if (author !== '') {
      let r = marketingList.filter((item) => {
        return item.staff_name.includes(author)
      })
      setMarketingListFilter(r)
    } else {
      setMarketingListFilter(marketingList)
    }
  }, [author])

  useEffect(() => {
    dispatch(loadMarcetingList(Number(searchParams.get('company_group_id'))))
  }, [])

  function divisionsToString(divisions: string[]) {
    let r = ''
    divisions.forEach((item, index) => {
      if (index === divisions.length - 1) {
        r = r + item
      } else {
        r = r + item + ', '
      }
    })
    return r
  }

  async function getDescription(id: number) {
    return 'iiiiiii'
  }

  const renderMarketingList = marketingListFilter.map((item, index) => {
    return (
      <div
        onClick={() => {
          if (activeMarcetingAction !== item.id) {
            dispatch(setActiveMarcetingAction(item.id))
          } else {
            dispatch(setActiveMarcetingAction(null))
          }
        }}
        className={classNames(
          styles.tableRow,
          item.id === activeMarcetingAction ? styles.active : '',
          new Date(item.date_to) < new Date() ? styles.tableRowNotActive : ''
        )}
        key={index}
        style={index % 2 === 1 ? { backgroundColor: '#c0e1c6' } : {}}
      >
        <div>&nbsp;</div>
        <div>{item.date_since}</div>
        <div>{item.date_to}</div>
        <div>{item.marketing_action_name}</div>
        <div>{item.discount_value_percent}&nbsp;%</div>
        <div title={item.marketing_action_description}>
          <img src={i} alt="" />
        </div>
        <div title={divisionsToString(item.divisions)}>
          {divisionsToString(item.divisions)}
        </div>
        <div title={item.author_user_role_name}>
          {item.author_user_role_name}
        </div>
        <div title={item.staff_name}>{item.staff_name}</div>
      </div>
    )
  })

  return (
    <div className={styles.list}>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <div> &nbsp;</div>
          <div>Период действия</div>
          <div>Название</div>
          <div>Скидка</div>
          <div> &nbsp;</div>
          <div>Подразделения</div>
          <div>Должность</div>
          <div>Автор</div>
        </div>
        <div className={styles.tableBody}>{renderMarketingList}</div>
      </div>
    </div>
  )
}
