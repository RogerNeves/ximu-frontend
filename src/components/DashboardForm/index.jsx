import React, { Component, Fragment } from 'react';
import {Link,Redirect} from 'react-router-dom'

import BackEndApi from '../../BackEndApi'

export default class DashboardForm extends Component {
  constructor(props){
    super(props)
    this.backEndApi = new BackEndApi()
    this.ChangeDashboardFrom = props.ChangeDashboardFrom
    this.state = {
      name:''
    }
  }

  async submitDashboard(e){
    e.preventDefault()
    const {name} = this.state
    const dashboard = {name}
    const resp = await this.backEndApi.postDashboard(dashboard)
    if(resp.success){
      this.ChangeDashboardFrom()
    }
  }

  changeName(e){
    const name = e.target.value
    this.setState({
      name
    })
  }

  render() {
    return (
      <Fragment>
        <form onSubmit={this.submitDashboard.bind(this)} className="dashboard-form">
          <input type="text" name="name" value={this.state.name} onChange={this.changeName.bind(this)}/>
          <div className="buttons">
          <input type="submit" value="Salvar"/>
          <button onClick={this.ChangeDashboardFrom}>Cancelar</button>
          </div>
        </form>
      </Fragment>
    );
  }
}
