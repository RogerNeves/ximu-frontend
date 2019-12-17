import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

export default class DialogBoxBackground extends Component {
  constructor(props) {
    super(props)
    this.close = props.close
  }
  render() {
    return (
      <Fragment>
        <Link className='dialog-Box-BG' to={`/${this.close}`}>  </Link>
      </Fragment>
    )
  }
}
