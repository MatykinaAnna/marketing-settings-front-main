import styles from './settings.module.scss'
import { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { arm } from '../../../shared/icons/_index'
import {
  loadSettings,
  setName,
  setDiscount,
  setIs_not_active,
  setIs_manual,
  setDescription,
  setId,
  addmarketingItem,
  setActiveMarketingProgram,
  setIs_manual_marketingPr,
  setIs_not_active_marketingPr,
  setName_string_marketingPr,
  addAssortment,
  clearSettings,
} from '../index'
import classNames from 'classnames'

const Settings = () => {
  const dispatch = useAppDispatch()
  const categoriesInf = useAppSelector(
    (state) => state.categoriesReducer.categoriesInf
  )

  let assortment = useAppSelector(
    (state) => state.settingsReducer.settingsForServer.assortment
  )

  const allServicesInf = useAppSelector(
    (state) => state.allServicesvicesReducer.allServicesInf
  )

  const activeMarketingProgram = useAppSelector(
    (state) => state.marketingProgramReducer.activeMarketingProgram
  )

  const settingInfForServer = useAppSelector(
    (state) => state.settingsReducer.settingsForServer
  )

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value

    console.log(target.name, target.name === 'name')
    if (target.name === 'name') {
      dispatch(setName(value))
    } else if (target.name === 'discount') {
      dispatch(setDiscount(value))
    } else if (target.name === 'active') {
      dispatch(setIs_not_active(value))
    } else if (target.name === 'hand') {
      dispatch(setIs_manual(value))
    }
  }

  function handleTextAreaChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const target = event.target
    dispatch(setDescription(target.value))
  }

  async function clickOnSave() {
    let assortment1: {}[] = []

    assortment.forEach((item) => {
      assortment1.push(item)
    })

    async function processArray(
      array: {
        id: number
        name: string
        check: boolean
        order_num: number
      }[]
    ) {
      for (const item of array) {
        if (item.check) {
          const response: void | Response = await fetch(
            `https://mis-ru-selling-service.numedy.com/api/v1/category/${item.id}`,
            {
              method: 'get',
            }
          )
            .then((response) => {
              return response.json()
            })
            .then(
              (
                data: {
                  name: string
                  product_item_id: number
                  product_kind_id: number
                }[]
              ) => {
                data.forEach((item1) => {
                  console.log('item1', item1)
                  assortment1.push({
                    product_kind_id: item1.product_kind_id,
                    product_item_id: item1.product_item_id,
                    name: item1.name,
                  })
                  console.log('assortment1', assortment1)
                })
              }
            )
        }
      }
    }

    await processArray(categoriesInf)

    console.log(assortment1)

    let data = {
      assortment: assortment1,
      name_string: settingInfForServer.name_string,
      description: settingInfForServer.description,
      is_not_active: settingInfForServer.is_not_active,
      is_manual: settingInfForServer.is_manual,
      discount_value_percent: settingInfForServer.discount_value_percent,
      formula: settingInfForServer.formula,
      is_simple: settingInfForServer.is_simple,
    }

    if (settingInfForServer.id === -1) {
      console.log('создать новую программу')

      const response: void | Response = await fetch(
        'https://mis-ru-selling-service.numedy.com/api/v1/marketing_program/',
        {
          method: 'post',
          body: JSON.stringify(data),
          headers: {
            'content-type': 'application/json',
          },
        }
      )
        .then((response) => response.json())
        .then((data: { status: string; id: string }) => {
          console.log(data)
          dispatch(setId(Number(data.id)))
          dispatch(
            addmarketingItem({
              id: Number(data.id),
              name_string: settingInfForServer.name_string,
              is_manual: settingInfForServer.is_manual,
              is_not_active: settingInfForServer.is_not_active,
            })
          )
          dispatch(setActiveMarketingProgram(Number(data.id)))
        })
    } else {
      console.log('редактировать программу')
      console.log(data)
      const response: void | Response = await fetch(
        `https://mis-ru-selling-service.numedy.com/api/v1/marketing_program/${settingInfForServer.id}`,
        {
          method: 'put',
          body: JSON.stringify(data),
          headers: {
            'content-type': 'application/json',
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          dispatch(
            setIs_manual_marketingPr({
              id: settingInfForServer.id,
              is_manual: settingInfForServer.is_manual,
            })
          )
          dispatch(
            setIs_not_active_marketingPr({
              id: settingInfForServer.id,
              is_not_active: settingInfForServer.is_not_active,
            })
          )
          dispatch(
            setName_string_marketingPr({
              id: settingInfForServer.id,
              name_string: settingInfForServer.name_string,
            })
          )

          console.log('Нужно ли это делать?')
          dispatch(setActiveMarketingProgram(-1))
          dispatch(clearSettings())
        })
    }
  }

  useEffect(() => {
    console.log('activeMarketingProgram', activeMarketingProgram)
    if (activeMarketingProgram > -1) {
      dispatch(loadSettings(activeMarketingProgram))
    }
  }, [activeMarketingProgram])

  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <span className="header">Настройки маркетинговой программы</span>
        <button
          onClick={(e) => clickOnSave()}
          className={classNames(styles.saveBtn)}
          disabled={
            settingInfForServer.name_string === '' ||
            settingInfForServer.description === ''
          }
        ></button>
      </div>
      <div className={styles.name}>
        <div className={styles.label}>Название</div>
        <input
          type="text"
          name="name"
          value={settingInfForServer.name_string}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.discount}>
        <div className={styles.label}>Скидка / Наценка</div>
        <input
          type="text"
          name="discount"
          value={settingInfForServer.discount_value_percent}
          onChange={handleInputChange}
        />
        <span>%</span>
        <div className={styles.active}>Активная</div>
        <div style={{ width: '80px' }}>
          <input
            type="checkbox"
            name="active"
            checked={!Boolean(settingInfForServer.is_not_active)}
            onChange={handleInputChange}
          />
          <img style={{ marginLeft: '35px' }} src={arm} alt="arm" />
        </div>
        <input
          type="checkbox"
          name="hand"
          checked={Boolean(settingInfForServer.is_manual)}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.description}>
        <textarea
          cols={80}
          rows={8.5}
          name="description"
          onChange={handleTextAreaChange}
          value={settingInfForServer.description}
        ></textarea>
      </div>
    </div>
  )
}
export default Settings
