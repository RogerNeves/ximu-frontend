import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BackEndApi from '../../BackEndApi'

import DashboardList from '../DashboardList'
import DashboardForm from '../DashboardForm'

import Logo from './img/logo.png'

export default class NavBar extends Component {
  constructor(props) {
    super(props)
    this.backEndApi = new BackEndApi()
    this.state = {
      dashboardList : [],
      addDashboard: false
    }
  }

  async attList(){
    const resp = await this.backEndApi.getDashboards()
    if (resp.success) {
      this.setState({
        dashboardList: resp.dashboardList
      })
    }}


  ChangeDashboardFrom(){
    const addDashboard = !this.state.addDashboard
    this.setState({addDashboard})
    this.attList()
  }

  render() {
    const {dashboardList,addDashboard} = this.state
    return (
      <header >
        <div className="col12 top">
          <div className="col12 height divHeader borderHeader">
            <img src={Logo} alt="logo" />
          </div>
          <div className="dashboard col12">
            <DashboardList dashboardList={dashboardList} attList={this.attList.bind(this)}/>
            <div className="height divHeader borderHeader">
              <p className="pHeader" onClick={this.ChangeDashboardFrom.bind(this)}>+</p>
              {addDashboard && (<DashboardForm ChangeDashboardFrom={this.ChangeDashboardFrom.bind(this)}/>)}
            </div>
          </div>
        </div>
        <div className="col12 baixo">
          <div className="config">
            <div className="height divHeader borderHeader col12">
              <Link to='/modelos'><p className="pHeader">M</p></Link>
            </div>
            <div className="height divHeader borderHeader col12">
              <Link to='/dispositivos'><p className="pHeader">D</p></Link>
            </div>
          </div>
        </div>
      </header>
    )
  }
}