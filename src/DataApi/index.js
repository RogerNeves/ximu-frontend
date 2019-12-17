import React, { Component } from 'react'
import Moment from 'moment'

export default class DataApi extends Component {
  
  dateGrouping(datas, divider, dateStyle) {
    const categories = []
    datas.forEach(data => {
      const date = Moment(data[divider].toString()).format(dateStyle)
      if (!categories.includes(date)) {
        categories.push(date)
      }
    })

    const datasArray = categories.map(date => {
      return datas.filter(data => {
        return Moment(data[divider].toString()).format(dateStyle) === date
      })
    })
    return { datasArray, categories }
  }

  grouping(datas, divider) {
    const categories = []
    datas.forEach(data => {
      const dividers = data[divider]
      if (!categories.includes(dividers)) {
        categories.push(dividers)
      }
    })

    const datasArray = categories.map(dividers => {
      return datas.filter(data => {
        return data[divider] === dividers
      })
    })
    return { datasArray, categories }
  }

  dataFormater(datas, view) {
    if(view.dataStyle === "dateMedia" || view.dataStyle === "dateSum")
      datas = this.dateGrouping(datas,view.dividerName, view.dateStyle)
    else
      datas = this.grouping(datas,view.dividerName)
    let datasArray = datas.datasArray.map(array => array.map(value => value[view.dataName]))
    let sum = datasArray.map(array => array.reduce((before, actual) => {
      return before + actual;
    }))
    if(view.dataStyle === "meida" || view.dataStyle === "dateMedia")
      sum = sum.map((value, index) => (value / datasArray[index].length).toFixed(1))
    datas.datas = sum
    return datas
  }
}