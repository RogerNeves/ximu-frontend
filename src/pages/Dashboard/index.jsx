import React, { Component } from 'react';
import BackEndApi from '../../BackEndApi'

import NavBar from '../../components/NavBar'
import AddButton from '../../components/AddButton'
import BarChart from '../../components/BarChart'
import LineChart from '../../components/LineChart'
import ViewForm from '../../components/ViewForm'




export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.idView =  props.match.params.idView || null
    this.id = props.match.params.id || null
    this.backEndApi = new BackEndApi()
    this.state = {
      views: []
    }
  }
  async componentDidMount() {
    const resp = await this.backEndApi.getViews(this.id)
    if (resp.success) {
      this.setState({
        views:resp.views
      })
    }
  }

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <section>
          <div className='section-wrap' >
            {this.state.views.map((view, index) => {
              switch (view.type) {
                case 'gauge':
                //return (<Gauge view={view} key={index} />)
                break
                case 'bar':
                  return (<BarChart view={view} key={index} />)
                  break
                case 'line':
                  return (<LineChart view={view} key={index} />)
                  break
                case 'radar':
                //return (<RadarChart view={view} key={index} />)
                break
                default:
                  return 0;
              }
            })}
            <AddButton path={`${this.id}/view`} />
          </div>
          {this.idView && (<ViewForm history={this.props.history} idView={this.idView} idDashboard={this.id}/>)}
        </section>
      </React.Fragment>)
  }
}
