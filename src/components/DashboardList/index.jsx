import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

import BackEndApi from '../../BackEndApi'

export default class DashboardList extends Component {
  constructor(props) {
    super(props)
    this.backEndApi = new BackEndApi()
    this.attList = props.attList
    this.state = {
      dashboardList: []
    }
  }
  async componentDidMount() {
    const resp = await this.backEndApi.getDashboards()
    if (resp.success) {
      this.setState({
        dashboardList: resp.dashboardList
      })
    }
  }
  render() {
    const { dashboardList } = this.state
    return (
      <div className="grupos col12 divHeader">
        {dashboardList.map((dashboard, index) => (
          <Fragment key={index}>
            <div className="height col12 divHeader borderHeader" id={dashboard.id}>
              <Link to={`/dashboard/${dashboard.id}`} className="pHeader col6">{dashboard.name.slice(0, 1).toUpperCase()}</Link>
            </div>
          </Fragment>
        )
        )
        }
      </div>
    )
  }
}