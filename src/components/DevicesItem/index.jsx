import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

export default class DevicesItem extends Component{
  render(){
    const { path, device } = this.props
    return(
      <Fragment>
        <Link to={`${path}/${device.id}`} className="item">
          <h2>{ device.name }</h2>
          <h3>Modelo:{ device.model }</h3>
          <p>Token: {device.token}</p>
        </Link>
      </Fragment>
    )
  }
}