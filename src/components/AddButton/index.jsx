import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

export default class AddButton extends Component {
  constructor(props) {
    super(props)
    this.path = props.path
  }
  render() {
    return (
      <Fragment>
        <Link className='add-button' to={`${this.path}/new`}> + </Link>
      </Fragment>
    )
  }
}
