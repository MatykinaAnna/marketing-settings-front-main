import classNames from 'classnames'
import styles from './header1.module.scss'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import DatePicker, { registerLocale } from 'react-datepicker'
import Search from '../../../shared/ui-kit/Search/Search'
import { add, calendar, clear, noclear } from 'shared/icons/_index'
import { useEffect, useState } from 'react'
import { Dropdown } from '@mc/numedy-ui-kit'
import '@mc/numedy-ui-kit/dist/esm/index.css'
import { dropdownOption } from 'shared/interfaces'

import {
  setMarketingProgram,
  loadMarcetingProgram,
  setCurrent,
  setAuthor,
  setEndDate,
  setStartDate,
  loadDC,
  seDivisionProgram,
} from '..'
import { useSearchParams } from 'react-router-dom'

//@ts-ignore
const Header1 = ({ clickPlus }) => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()

  // const [startDate, setStartDate] = useState<Date>()
  // const [endDate, setEndDate] = useState<Date>()

  const startDate = useAppSelector((state) => state.header1Reducer.startDate)
  const endDate = useAppSelector((state) => state.header1Reducer.endDate)

  const marketingProgramDropdownId = useAppSelector(
    (state) => state.header1Reducer.marketingProgram
  )
  const divisionDropdownId = useAppSelector(
    (state) => state.header1Reducer.division
  )

  const listDC = useAppSelector((state) => state.setting1Reducer.dc_list)

  const current = useAppSelector((state) => state.header1Reducer.current)

  const author = useAppSelector((state) => state.header1Reducer.author)

  const setActiveOption = (option: { id: number; string: string }) => {
    dispatch(setMarketingProgram(option.id))
  }

  const setDivision = (option: { id: number; string: string }) => {
    dispatch(seDivisionProgram(option.id))
  }

  const activeMarkProg = useAppSelector(
    (state) => state.marketingListReducer.activeMarcetingAction
  )

  const [searchValue, setSearchValue] = useState('')
  const [searchResults, setSearchResults] = useState<{}[]>([
    { id: -1, string: 'Маркиетинговая программа' },
  ])

  const handleChange = () => {
    clickPlus() // callback-функция
  }

  const marketingProgram = useAppSelector(
    (state) => state.marketingProgramReducer.marketingItem
  )

  const [marketingProgramDropdown, setMarketingProgramDropdown] =
    useState<{ id: number; string: string }[]>()

  const [dcDropdown, setDcDropdown] =
    useState<{ id: number; string: string }[]>()

  function clearFirstRow() {
    dispatch(setStartDate(null))
    dispatch(setEndDate(null))
    dispatch(seDivisionProgram(-1))
  }

  useEffect(() => {
    dispatch(loadMarcetingProgram())
    dispatch(loadDC(Number(searchParams.get('company_group_id'))))
  }, [])

  useEffect(() => {
    let r = [{ id: -1, string: 'Маркетинговая программа' }]
    marketingProgram.forEach((item) => {
      r.push({ id: item.id, string: item.name_string })
    })
    if (r !== undefined) {
      setMarketingProgramDropdown(r)
    }
  }, [marketingProgram])

  useEffect(() => {
    let r = [{ id: -1, string: 'Подразделения' }]
    listDC.forEach((item) => {
      r.push({ id: item.id, string: item.name })
    })
    if (r !== undefined) {
      setDcDropdown(r)
    }
  }, [listDC])

  return (
    <div className={styles.body}>
      <div className={styles.row1}>
        <span style={{ width: '26px', textAlign: 'center', marginTop: '3px' }}>
          с
        </span>

        <div>
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
                  dispatch(setStartDate(date))
                }
              }}
              locale="ru"
            />
            <div className={styles.datepicker_ico}>
              <img src={calendar} alt="" />
            </div>
          </label>
        </div>

        <span style={{ width: '23px', marginTop: '3px', marginLeft: '23px' }}>
          по
        </span>

        <div>
          <label
            className={classNames(
              styles.datepicker_container
              // isStartDateActive === true ? null : styles.disabled,
              // isStartDateActive === false && isEndDateActive !== null
              //   ? styles.hidden
              //   : null
            )}
          >
            <DatePicker
              dateFormat="dd.MM.yyyy"
              selected={endDate}
              onChange={(date) => {
                if (date !== null) {
                  dispatch(setEndDate(date))
                }
              }}
              locale="ru"
            />
            <div className={styles.datepicker_ico}>
              <img src={calendar} alt="" />
            </div>
          </label>
        </div>

        <div style={{ width: '100px', marginLeft: '36px' }}>
          <Dropdown
            options={[{ id: -1, string: 'Компания' }]}
            activeOption={-1}
            setActiveOption={setActiveOption}
            string={'string'} // поле элемента массива options -- навание элемента массива
          />
        </div>

        <div style={{ width: '100px', marginLeft: '10px' }}>
          <Dropdown
            options={[{ id: -1, string: 'Область' }]}
            activeOption={-1}
            setActiveOption={setActiveOption}
            string={'string'} // поле элемента массива options -- навание элемента массива
          />
        </div>

        <div style={{ width: '100px', marginLeft: '10px' }}>
          <Dropdown
            options={[{ id: -1, string: 'Город' }]}
            activeOption={-1}
            setActiveOption={setActiveOption}
            string={'string'} // поле элемента массива options -- навание элемента массива
          />
        </div>

        <div style={{ width: '210px', marginLeft: '10px' }}>
          <Dropdown
            options={
              dcDropdown !== undefined
                ? dcDropdown
                : [{ id: -1, string: 'Подразделения' }]
            }
            activeOption={divisionDropdownId}
            setActiveOption={setDivision}
            string={'string'} // поле элемента массива options -- навание элемента массива
          />
        </div>

        <button
          className={styles.clear}
          onClick={() => {
            clearFirstRow()
          }}
        >
          {startDate !== null ||
          endDate !== null ||
          divisionDropdownId !== -1 ? (
            <img src={clear} alt="" />
          ) : (
            <img src={noclear} alt="" />
          )}
        </button>

        <button
          className={styles.add_btn}
          disabled={activeMarkProg !== null}
          onClick={handleChange}
        >
          <img src={add} alt="" />
        </button>
      </div>
      <div className={styles.row2}>
        <div style={{ width: '408px', marginLeft: '156px' }}>
          <Dropdown
            options={
              marketingProgramDropdown !== undefined
                ? marketingProgramDropdown
                : [{ id: -1, string: 'Маркетинговая программа' }]
            }
            activeOption={marketingProgramDropdownId}
            setActiveOption={setActiveOption}
            string={'string'} // поле элемента массива options -- навание элемента массива
          />
        </div>
        <div style={{ width: '170px' }}>
          <button
            className={styles.clear}
            onClick={() => {
              dispatch(setMarketingProgram(-1))
            }}
          >
            {marketingProgramDropdownId !== -1 ? (
              <img src={clear} alt="" />
            ) : (
              <img src={noclear} alt="" />
            )}
          </button>
        </div>
        <div className={styles.checkbox} style={{ width: '246px' }}>
          <input
            type="checkbox"
            id="current"
            checked={current}
            onChange={() => dispatch(setCurrent(!current))}
          />
          <label htmlFor="current">Действующие</label>
        </div>
        <div className={styles.search}>
          <Search
            placeholder="Автор"
            value={author}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(setAuthor(e.target.value))
            }}
          />
          <button
            className={styles.clear}
            onClick={() => dispatch(setAuthor(''))}
          >
            {author.length > 0 ? (
              <img src={clear} alt="" />
            ) : (
              <img src={noclear} alt="" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header1
