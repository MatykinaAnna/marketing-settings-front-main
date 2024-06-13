import MarketingProgram from '../../../features/marketingProgram/ui/marketingProgram'
import Services from '../../../features/services/ui/services'
import Categories from '../../../features/categories/ui/categories'
import AllServicesvices from '../../../features/allServicesvices/ui/allServicesvices'
import Settings from '../../../features/settings/ui/settings'
import styles from './marcetingProgram.module.scss'
import { useAppSelector } from '../../../app/hooks'
import bg1193х701 from '../../../shared/icons/bg1193х701.png'
import { useEffect, useState } from 'react'
import { Loader } from '../../../features/Loader'

const MarcetingProgram = () => {
  const loadSettingsStatus = useAppSelector(
    (state) => state.settingsReducer.loadSettingsStatus
  )

  const [loader, setLoader] = useState<string>('')

  const activeCategory = useAppSelector(
    (state) => state.categoriesReducer.activeCategory
  )
  const activeMarketingProgram = useAppSelector(
    (state) => state.marketingProgramReducer.activeMarketingProgram
  )

  useEffect(() => {
    console.log(loadSettingsStatus)
    setLoader(loadSettingsStatus)
  }, [loadSettingsStatus])

  return (
    <div className={styles.app}>
      <div className={styles.marketingProgram}>
        <MarketingProgram />
      </div>

      {loader === 'pending' && <Loader />}

      {
        <div className={styles.settings}>
          <Settings />
        </div>
      }
      {
        <div className={styles.categories}>
          <Categories />
        </div>
      }
      {(activeCategory !== -1 || activeMarketingProgram !== -1) && (
        <>
          <div className={styles.services}>
            <Services />
          </div>
          <div className={styles.allServices}>{<AllServicesvices />}</div>
        </>
      )}
      {activeCategory === -1 && activeMarketingProgram === -1 && (
        <img src={bg1193х701} alt="" />
      )}
    </div>
  )
}

export default MarcetingProgram
