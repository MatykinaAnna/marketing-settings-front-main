import styles from './magazinesOfMP.module.scss'

import DatePicker from 'react-datepicker'
import { setDefaultLocale } from 'react-datepicker'
import Header1 from 'features/header1/ui/header1'
import ru from 'date-fns/locale/ru'

import {
  MarketingProgram1,
  Settings1,
  MarketingList,
  setActiveMarketingProgram,
  clearDC,
  clearUserRole,
  setActiveMarcetingAction,
  clearSettings,
} from '../index'
import { max_612_295, max612_932 } from '../../../shared/icons/_index'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { useEffect, useState } from 'react'

const MagazinesOfMP = () => {
  const dispatch = useAppDispatch()

  const activeMarketingProgram = useAppSelector(
    (state) => state.marketingProgramReducer.activeMarketingProgram
  )
  const activeMarketingAct = useAppSelector(
    (state) => state.marketingListReducer.activeMarcetingAction
  )

  const [flagWindow, setFlagWindow] = useState(true)
  const [flagMP, setFlagMP] = useState(false)

  useEffect(() => {
    if (activeMarketingAct === null) {
      setFlagMP(false)
      setFlagWindow(true)
      dispatch(setActiveMarketingProgram(-1))
    }
  }, [activeMarketingAct])

  const activeMarcetingAction = useAppSelector(
    (state) => state.marketingListReducer.activeMarcetingAction
  )

  useEffect(() => {
    if (activeMarcetingAction !== null) {
      setFlagMP(true)
      setFlagWindow(false)
      dispatch(clearDC())
      dispatch(clearUserRole())
      dispatch(clearSettings())
    }
  }, [activeMarcetingAction])

  function openMP() {
    setFlagMP(true)
    dispatch(clearDC())
    dispatch(clearUserRole())
  }

  function closeMP() {
    dispatch(setActiveMarcetingAction(null))
    setFlagMP(false)
    setFlagWindow(true)
    dispatch(setActiveMarketingProgram(-1))
  }

  function clickOK() {
    setFlagWindow(false)
  }

  return (
    <div className={styles.app}>
      <div>
        <Header1 clickPlus={openMP} />
      </div>

      {!flagMP ? (
        <div className={styles.plugGridRow4}>
          <img src={max612_932} alt="" />
        </div>
      ) : (
        <>
          {flagWindow ? (
            <>
              <div className={styles.plugGridRow2}>
                <img src={max_612_295} alt="" />
              </div>
            </>
          ) : (
            <div className={styles.plugGridRow3}>
              <Settings1 clickClose={closeMP} />
            </div>
          )}
        </>
      )}

      <div className={styles.list}>
        <MarketingList />
      </div>

      {flagMP && flagWindow ? (
        <div className={styles.markProgram}>
          <MarketingProgram1 clickClose={closeMP} clickOK={clickOK} />
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default MagazinesOfMP
