import styles from './settings1.module.scss'
import { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import {
  arm,
  del,
  greenDel,
  calendar,
  clear,
  noclear,
  arrowTo,
  arrowWitch,
} from '../../../shared/icons/_index'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import { clip2 } from '../../../shared/icons/_index'
import Search from '../../../shared/ui-kit/Search/Search'
import {
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
} from '../index'
import { dcItem, userRoleItem } from 'shared/interfaces'

import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import ru from 'date-fns/locale/ru'
import { useSearchParams } from 'react-router-dom'
import { loadUserRoles } from '../model/thunks'
import { setActiveMarcetingAction } from 'features/marketingList'
registerLocale('ru', ru)

//@ts-ignore
const Settings1 = ({ clickClose }) => {
  const activeMarketingProgram = useAppSelector(
    (state) => state.marketingProgramReducer.activeMarketingProgram
  ) // id выделенная маркетинговая программа на экране Маркетинговые программы
  const settingInfForServer = useAppSelector(
    (state) => state.settingsReducer.settingsForServer
  )

  const marketingActionId = useAppSelector(
    (state) => state.setting1Reducer.marketing_action
  ) // id маркетинговой программы уже созданной программы

  const settingsForServer = useAppSelector(
    (state) => state.settingsReducer.settingsForServer
  )

  const dispatch = useAppDispatch()
  // функции для поиск (фильтр)
  const [searchValue, setSearchValue] = useState('')
  const [searchResults, setSearchResults] = useState<dcItem[]>([])

  const [searchValueRole, setSearchValueRole] = useState('')
  const [searchResultsRole, setSearchResultsRole] = useState<userRoleItem[]>([])

  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  const [allDC, setAllDC] = useState(false)
  const [allRole, setAllRole] = useState(false)

  const timeRange = useAppSelector((state) => state.setting1Reducer.time_range)
  const dcList = useAppSelector((state) => state.setting1Reducer.dc_list)
  const urList = useAppSelector((state) => state.setting1Reducer.userRole_list)
  const dc_checked = useAppSelector((state) => state.setting1Reducer.dc_checked)
  const userRole_checked = useAppSelector(
    (state) => state.setting1Reducer.userRole_checked
  )

  const [searchParams, setSearchParams] = useSearchParams()

  const activeMarcetingAction = useAppSelector(
    (state) => state.marketingListReducer.activeMarcetingAction
  )

  const markList = useAppSelector(
    (state) => state.marketingListReducer.marketing_action_journal
  )

  const handleChange = () => {
    clickClose() // callback-функция
  }

  const activeMarc = () => {
    if (
      markList.find((item) => {
        return item.id === activeMarcetingAction
      }) !== undefined
    ) {
      return (
        new Date(
          markList.find((item) => {
            return item.id === activeMarcetingAction
          })!.date_to
        ) < new Date()
      )
    } else if (timeRange.start === '' || timeRange.end === '') {
      return true
    } else {
      return false
    }
  }

  function checkDC(id: number) {
    let rezult = dc_checked.find((item) => {
      return item === id
    })
    if (rezult !== undefined) {
      return true
    } else {
      return false
    }
  }

  function checkUserRole(id: number) {
    let rezult = userRole_checked.find((item) => {
      return item === id
    })
    if (rezult !== undefined) {
      return true
    } else {
      return false
    }
  }

  useEffect(() => {
    if (allDC) {
      dispatch(clearDC())
      dcList.forEach((item) => {
        dispatch(addDC({ id: item.id }))
      })
    } else {
      dispatch(clearDC())
    }
  }, [allDC])

  useEffect(() => {
    if (allRole) {
      dispatch(clearUserRole())
      urList.forEach((item) => {
        dispatch(addUserRole({ id: item.id }))
      })
    } else {
      dispatch(clearUserRole())
    }
  }, [allRole])

  useEffect(() => {
    let mAct = markList.find((item) => {
      return item.id === activeMarcetingAction
    })
    console.log(mAct)

    if (mAct !== undefined) {
      dispatch(
        setDate({
          start: mAct.date_since,
          end: mAct.date_to,
        })
      )
      setStartDate(new Date(mAct.date_since))
      setEndDate(new Date(mAct.date_to))
    }
  }, [activeMarcetingAction])

  useEffect(() => {
    console.log('activeMarcetingAction')
    if (activeMarketingProgram !== -1) {
      dispatch(loadSettings(activeMarketingProgram))
    }
    dispatch(loadDC(Number(searchParams.get('company_group_id'))))
    dispatch(loadUserRoles(Number(searchParams.get('company_group_id'))))

    if (activeMarcetingAction !== null) {
      dispatch(loadMarketingActionUsage(activeMarcetingAction))
      //dispatch(loadSettings(activeMarcetingAction));
    }
  }, [activeMarcetingAction])

  useEffect(() => {
    if (activeMarcetingAction !== null) {
      dispatch(loadSettings(marketingActionId))
    }
  }, [marketingActionId])

  useEffect(() => {
    if (dcList !== undefined) {
      if (searchValue !== '') {
        const results = dcList.filter((item) => {
          return item.name.includes(searchValue)
        })
        setSearchResults(results)
      } else {
        setSearchResults(dcList)
      }
    }
  }, [searchValue, dcList])

  useEffect(() => {
    if (urList !== undefined) {
      if (searchValueRole !== '') {
        const results = urList.filter((item) => {
          return item.name.includes(searchValueRole)
        })
        setSearchResultsRole(results)
      } else {
        setSearchResultsRole(urList)
      }
    }
  }, [searchValueRole, urList])

  function clickDC(value: boolean, id: number) {
    if (value) {
      dispatch(addDC({ id: id }))
    } else {
      dispatch(delDC({ id: id }))
    }
  }

  function clicUserRole(value: boolean, id: number) {
    if (value) {
      dispatch(addUserRole({ id: id }))
    } else {
      dispatch(delUserRolel({ id: id }))
    }
  }

  function dateToString(d: Date | null) {
    if (d !== null) {
      let r = d.getFullYear() + '-'
      if (Number(d.getMonth()) + 1 < 10) {
        r = r + '0'
      }
      r = r + (d.getMonth() + 1) + '-'
      if (Number(d.getDate()) < 10) {
        r = r + '0'
      }
      r = r + d.getDate()
      return r
    } else return ''
  }

  async function clickOK() {
    let data = {
      marketing_action: activeMarketingProgram,
      date_since: dateToString(startDate),
      date_to: dateToString(endDate),
      company_group_id: Number(searchParams.get('company_group_id')),
      divisions: dc_checked,
      user_roles: userRole_checked,
      user_role: Number(searchParams.get('user_role_id')),
      staff_id: Number(searchParams.get('staff_id')),
      staff_name: String(searchParams.get('staff_name')),
    }

    if (activeMarcetingAction === null) {
      const responce: void | Response = await fetch(
        'https://mis-ru-selling-service.numedy.com/api/v1/marketing_action_usage/',
        {
          method: 'post',
          body: JSON.stringify(data),
          headers: {
            'content-type': 'application/json',
          },
        }
      )
        .then((response) => response.json())
        .then(
          (data: { marketing_action_usage_id: number; user_role: string }) => {
            let dcNameArrow: string[] = []
            dc_checked.forEach((item) => {
              let name_dc = dcList.find((item1) => {
                return item1.id === item
              })?.name
              if (name_dc !== undefined) {
                dcNameArrow.push(name_dc)
              }
            })

            dispatch(
              addMarketingActionJournal({
                id: data.marketing_action_usage_id,
                marketing_action: activeMarketingProgram,
                date_since: dateToString(startDate),
                date_to: dateToString(endDate),
                company_group_id: Number(searchParams.get('company_group_id')),
                //divisions: dc_checked,
                divisions: dcNameArrow,
                user_roles: userRole_checked,
                author_user_role_name: data.user_role,
                staff_id: Number(searchParams.get('staff_id')),
                staff_name: String(searchParams.get('staff_name')),
                marketing_action_name: settingInfForServer.name_string,
                discount_value_percent:
                  settingInfForServer.discount_value_percent,
              })
            )
            dispatch(setActiveMarcetingAction(data))
          }
        )
    } else {
      data.marketing_action = marketingActionId

      let updateData = {
        marketing_action_usage_id: activeMarcetingAction,
        ...data,
      }

      const responce: void | Response = await fetch(
        `https://mis-ru-selling-service.numedy.com/api/v1/marketing_action_usage/`,
        {
          method: 'put',
          body: JSON.stringify(updateData),
          headers: {
            'content-type': 'application/json',
          },
        }
      )
        .then((response) => response.json())
        .then(
          (data: { marketing_action_usage_id: number; user_role: string }) => {
            let dcNameArrow: string[] = []
            dc_checked.forEach((item) => {
              let name_dc = dcList.find((item1) => {
                return item1.id === item
              })?.name
              if (name_dc !== undefined) {
                dcNameArrow.push(name_dc)
              }
            })

            dispatch(
              updateMarketingActionJournal({
                id: data.marketing_action_usage_id,
                marketing_action: settingsForServer.id,
                date_since: dateToString(startDate),
                date_to: dateToString(endDate),
                company_group_id: Number(searchParams.get('company_group_id')),
                divisions: dcNameArrow,
                user_roles: userRole_checked,
                author_user_role_name: data.user_role,
                staff_id: Number(searchParams.get('staff_id')),
                staff_name: String(searchParams.get('staff_name')),
                marketing_action_name: settingInfForServer.name_string,
                discount_value_percent:
                  settingInfForServer.discount_value_percent,
              })
            )
            dispatch(setActiveMarcetingAction(data))
          }
        )
    }
  }

  async function clickDel() {
    handleChange()

    const responce: void | Response = await fetch(
      `https://mis-ru-selling-service.numedy.com/api/v1/marketing_action_usage/${activeMarcetingAction}`,
      {
        method: 'delete',
        headers: {
          'content-type': 'application/json',
        },
      }
    )
      .then((response) => response.json())
      .then((data: { details: string }) => {
        if (data.details === 'Success!')
          dispatch(delMarketingActionJournal(activeMarcetingAction))
      })
  }

  const renderDcList = searchResults.map((item, index) => {
    return (
      <div
        key={index}
        style={index % 2 === 1 ? { backgroundColor: '#c0e1c6' } : {}}
      >
        <input
          type="checkbox"
          id={`dc${index}`}
          checked={checkDC(item.id)}
          onChange={() => {
            clickDC(!checkDC(item.id), item.id)
          }}
        />
        <label htmlFor={`dc${index}`}>{item.name}</label>
      </div>
    )
  })

  const renderuserRoleList = searchResultsRole.map((item, index) => {
    return (
      <div
        key={index}
        style={index % 2 === 1 ? { backgroundColor: '#c0e1c6' } : {}}
      >
        <input
          type="checkbox"
          id={`uR${index}`}
          checked={checkUserRole(item.id)}
          onChange={() => {
            clicUserRole(!checkUserRole(item.id), item.id)
          }}
        />
        <label htmlFor={`uR${index}`}>{item.name}</label>
      </div>
    )
  })

  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <button
          className={styles.btnOk}
          onClick={clickOK}
          disabled={activeMarc()}
        >
          <div className={styles.img_arrow}>ㅤㅤㅤㅤ</div>
          <span>OK</span>
        </button>
        <div className={styles.block}>
          <div className={classNames(styles.row, styles.rowFirst)}>
            <span className={classNames('header', styles.header)}>
              Настройки маркетинговой программы
            </span>
            <img
              src={del}
              className={styles.del}
              alt=""
              width={20}
              height={20}
              onClick={clickDel}
            />
            <img
              src={greenDel}
              alt=""
              width={20}
              height={20}
              onClick={handleChange}
            />
          </div>
          <div className={styles.row}>
            <img src={arrowWitch} alt="" />
            <label
              className={classNames(
                styles.datepicker_container
                // isStartDateActive === true ? null : styles.disabled,
                // isStartDateActive === false && isStartDateActive !== null
                //   ? styles.hidden
                //   : null
              )}
            >
              <DatePicker
                dateFormat="dd.MM.yyyy"
                selected={startDate}
                onChange={(date) => {
                  if (date !== null) {
                    // setStartDate(date)
                    dispatch(setDate({ start: dateToString(date) }))
                    setStartDate(date)
                  }
                }}
                locale="ru"
              />
              <div className={styles.datepicker_ico}>
                <img src={calendar} alt="" />
              </div>
            </label>
            <img src={arrowTo} alt="" />
            <label
              className={classNames(
                styles.datepicker_container
                // isStartDateActive === true ? null : styles.disabled,
                // isStartDateActive === false && isStartDateActive !== null
                //   ? styles.hidden
                //   : null
              )}
            >
              <DatePicker
                dateFormat="dd.MM.yyyy"
                selected={endDate}
                onChange={(date) => {
                  if (date !== null) {
                    // setEndDate(date)
                    dispatch(setDate({ end: dateToString(date) }))
                    setEndDate(date)
                  }
                }}
                locale="ru"
              />
              <div className={styles.datepicker_ico}>
                <img src={calendar} alt="" />
              </div>
            </label>
            <button className={styles.btn_documents}>
              <img src={clip2} alt="" />
              <span>Вложения</span>
            </button>
          </div>
        </div>
      </div>
      <div className={styles.name}>{settingInfForServer.name_string}</div>
      <div className={styles.discount}>
        <div className={styles.label}>Скидка / Наценка</div>
        <div className={styles.discountValue}>
          {settingInfForServer.discount_value_percent}
        </div>
        <span>%</span>
        <div className={styles.active}>Активная</div>
        <div style={{ width: '80px' }}>
          <input
            type="checkbox"
            name="active"
            checked={!Boolean(settingInfForServer.is_not_active)}
          />
          <img style={{ marginLeft: '35px' }} src={arm} alt="arm" />
        </div>
        <input
          type="checkbox"
          name="hand"
          checked={Boolean(settingInfForServer.is_manual)}
        />
      </div>
      <div className={styles.description}>
        {settingInfForServer.description}
      </div>

      <div className={styles.rowSearch}>
        <div className={styles.search}>
          <Search
            placeholder="Подразделение"
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

        <div className={styles.searchRole}>
          <Search
            placeholder=""
            value={searchValueRole}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchValueRole(e.target.value)
            }}
          />
        </div>
        <button className={styles.clear} onClick={() => setSearchValueRole('')}>
          {searchValueRole.length > 0 ? (
            <img src={clear} alt="" />
          ) : (
            <img src={noclear} alt="" />
          )}
        </button>
      </div>

      <div className={styles.rowInf}>
        <div style={{ width: '375px' }}>
          <div className={styles.all}>
            <input
              type="checkbox"
              id={`allDC`}
              checked={allDC}
              onChange={() => {
                setAllDC(!allDC)
              }}
            />
            <label htmlFor={`allDC`}>{'Выбрать все'}</label>
          </div>
          <div className={styles.renderDcList}>{renderDcList}</div>
        </div>

        <div style={{ width: '235px' }}>
          <div className={styles.all}>
            <input
              type="checkbox"
              id={`allUsR`}
              checked={allRole}
              onChange={() => {
                setAllRole(!allRole)
              }}
            />
            <label htmlFor={`allUsR`}>{'Выбрать все'}</label>
          </div>
          <div className={styles.renderDcList}>{renderuserRoleList}</div>
        </div>
      </div>
    </div>
  )
}
export default Settings1
