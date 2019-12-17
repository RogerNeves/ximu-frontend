import React, { Component } from 'react';
import BackEndApi from '../../BackEndApi'

import NavBar from '../../components/NavBar'
import AddButton from '../../components/AddButton'
import BarChart from '../../components/BarChart'
import LineChart from '../../components/LineChart'




export default class Dashboard extends Component {
  constructor(props) {
    super(props)
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
                case 'bar':
                  return (<BarChart view={view} key={index} />)
                  break
                case 'line':
                  return (<LineChart view={view} key={index} />)
                  break
                case 'radar':
                //return (<RadarChart view={view} key={index} />)
                default:
                  return 0;
              }
            })}
            <AddButton path='/view' />
          </div>
        </section>
      </React.Fragment>)
  }
}
