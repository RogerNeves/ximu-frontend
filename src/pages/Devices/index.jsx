import React, { Component, Fragment } from 'react';
import BackEndApi from '../../BackEndApi'


import NavBar from '../../components/NavBar'
import AddButton from '../../components/AddButton'
import DevicesItem from '../../components/DevicesItem'
import DevicesForm from '../../components/DevicesForm'


export default class Devices extends Component {
  constructor(props){
    super(props)
    this.id = props.match.params.id || null
    this.backEndApi = new BackEndApi()
    this.state = {
      devices:[]
    }
  }

  async componentDidMount(){
    const resp = await this.backEndApi.getDevices()
    if (resp.success) {
      this.setState({
        devices: resp.devices
      })
    }
  }

  render() {
    const {devices} = this.state
    return (
      <Fragment>
        <NavBar />
        <section>
          <div className='section-wrap'>
            {devices.map((device, index) => (
              <DevicesItem path='dispositivos' device={device} key={index} />
            ))}
            <AddButton path='dispositivos' />
          </div>
          {this.id && <DevicesForm path='Dispositivos' idDevice={this.id} history={this.props.history} />}
        </section>
      </Fragment>
    )
  }
}
