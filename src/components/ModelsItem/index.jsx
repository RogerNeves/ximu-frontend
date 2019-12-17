import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

export default class ModelsItem extends Component{
  render(){
    const { path, model } = this.props
    return(
      <Fragment>
        <Link to={`${path}/${model.id}`} className="item">
          <h2>{model.name}</h2>
        </Link>
      </Fragment>
    )
  }
}