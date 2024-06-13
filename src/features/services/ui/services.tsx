import styles from './services.module.scss'
import { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { del } from '../../../shared/icons/_index'
import { useSelector } from 'react-redux'
import {
  addServicesInf,
  clearServicesInf,
  setActiveService,
  delAssortment,
} from '../index'
import classNames from 'classnames'

const Services = () => {
  const dispatch = useAppDispatch()
  const servicesInf = useAppSelector(
    (state) => state.servicesReducer.servicesInf
  )

  //услуги, для которых создана маркетинговая программа
  const assortment = useAppSelector(
    (state) => state.settingsReducer.settingsForServer.assortment
  )

  const categoriesInf = useAppSelector(
    (state) => state.categoriesReducer.categoriesInf
  )

  const activeService = useAppSelector(
    (state) => state.servicesReducer.activeService
  )

  //запись услуг в маркетинговой программе для корректного отображения с родительскими категориями в окне
  function writeArrayOfServices() {
    console.log('writeArrayOfServices')
    dispatch(clearServicesInf())
    let categoryId: number = -1
    console.log('assortment', assortment)
    assortment.forEach((item) => {
      // if (categoryId === item.product_kind_id) {
      //   dispatch(
      //     addServicesInf({
      //       id: item.product_item_id,
      //       servicesName: item.name,
      //       servicesType: 2,
      //     })
      //   )
      // } else {
      //   categoryId = item.product_kind_id
      //   let category = categoriesInf.find((item) => {
      //     return item.id === categoryId
      //   })
      //   if (category !== undefined) {
      //     dispatch(
      //       addServicesInf({
      //         id: category.id,
      //         servicesName: category.name,
      //         servicesType: 1,
      //       })
      //     )
      //   } else {
      //     console.log('не существует родительской категории для услуги: ', item)
      //   }
      dispatch(
        addServicesInf({
          id: item.product_item_id,
          servicesName: item.name,
          servicesType: 2,
        })
      )
      // }
    })
  }

  function ckickOnService(item: {
    id: number
    servicesName: string
    servicesType: number
  }) {
    if (item.id === activeService) {
      dispatch(setActiveService({ id: -1 }))
    } else {
      if (item.servicesType > 1) {
        dispatch(setActiveService({ id: item.id }))
      }
    }
  }

  function delService() {
    if (activeService !== -1) {
      dispatch(delAssortment({ product_item_id: activeService }))
    }
  }

  useEffect(() => {
    if (assortment !== undefined && categoriesInf !== undefined) {
      writeArrayOfServices()
    }
  }, [assortment, categoriesInf])

  const renderServicesInf = servicesInf.map(
    (
      item: { id: number; servicesName: string; servicesType: number },
      index: number
    ) => {
      if (item.servicesType === 2) {
        return (
          <div
            key={index}
            style={index % 2 !== 1 ? { backgroundColor: '#c0e1c6' } : {}}
            className={classNames(
              styles.tableRow,
              item.id === activeService ? styles.active : ''
            )}
          >
            <span
              onClick={(e) => ckickOnService(item)}
              className={classNames(item.servicesType > 1 ? styles.child : '')}
            >
              {item.servicesName}
            </span>
          </div>
        )
      }
    }
  )

  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <span className="header">Услуги в маркетинговой программе</span>
        <span
          className={
            activeService === -1 ? styles.disabled : styles.notDisabled
          }
          onClick={(e) => {
            delService()
          }}
        >
          <img src={del} alt="del" />
        </span>
      </div>

      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <div>Название</div>
        </div>
        <div className={styles.tableBody}>{renderServicesInf}</div>
      </div>
    </div>
  )
}
export default Services
