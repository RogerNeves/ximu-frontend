import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import BackEndApi from '../../BackEndApi'


import DialogBoxBackground from "../DialogBoxBackground"


export default class DevicesForm extends Component {
  constructor(props) {
    super(props)
    this.close = props.path
    this.backEndApi = new BackEndApi()
    this.id = props.idDevice
    this.state = {
      mqttTest: false,
      mqtt: {
        id: null,
        url: '',
        port: '',
        topic: '',
        clientId: '',
        username: '',
        password: ''
      },
      models: [],
      device: {
        id: null,
        name: '',
        IdModels: null
      }
    }
  }

  async componentDidMount() {
    const respModels = await this.backEndApi.getModels()
    if (respModels.success) {
      this.setState({ models: respModels.models })
    }
    if (this.id >1) {
      const device = await this.backEndApi.getDevice(this.id)
      if(device.success)
      this.setState({ device:device.device })
      const mqtt = await this.backEndApi.getMqtt(this.id)
      if (mqtt.success)
        this.setState({ mqtt:mqtt.mqtt })
    }
  }

  async sendDevice(e) {
    e.preventDefault()
    const { device, mqtt, mqttTest } = this.state    
    if (this.id==='new')
      await this.backEndApi.postDevice(device)
    else
      await this.backEndApi.putDevice(device, device.id)
    if (mqtt.id)
      await this.backEndApi.postMqtt(mqtt)
    else if (mqttTest)
      await this.backEndApi.putMqtt(mqtt, mqtt.id)

  }

  handleStateChange(e) {
    const { name, value } = e.target
    this.setState(({
      [name]: value
    }))
  }

  changeMqttTest(){
    const mqttTest = !this.state.mqttTest
    this.setState({
      mqttTest
    })
  }

  changeDevicesStateValue(e) {
    const { name, value } = e.target
    let { device } = this.state
    device[name]=value
    this.setState({
      device
    })
  }

  changeMqttStateValue(e) {
    const { name, value } = e.target
    this.setState(prevState => ({
      mqtt: {
        ...prevState.mqtt,
        [name]: value
      }
    }))
  }

  render() {
    const { close } = this
    const { mqttTest, mqtt, models, device } = this.state
    console.log(device)
    return (
      <Fragment>
        <DialogBoxBackground close={close} />
        <div className="add-form">
          <form onSubmit={this.sendDevice.bind(this)} className="add-form">
            <input type="text" name="name" id="add-name"value={device.name} required onChange={this.changeDevicesStateValue.bind(this)} />
            <select value={device.IdModels || 0} name="IdModels" required onChange={this.changeDevicesStateValue.bind(this)}>
              <option value={0}>Selecione um modelo</option>
              {models.map((model, index) => (
                <option value={model.id} key={index}>{model.name}</option>
              ))}
            </select>
            <div className="mqttTest">
              <input type='checkbox' checked={mqttTest} name="mqttTest" onChange={this.changeMqttTest.bind(this)} />
              <p>Mqtt</p>
            </div>
            <div className='data-form'>
              {mqttTest &&
                (<Fragment>
                  <input type="text" placeholder='url do broker' value={mqtt.url} onChange={this.changeMqttStateValue.bind(this)} />
                  <input type="number" placeholder='porta' value={mqtt.port} onChange={this.changeMqttStateValue.bind(this)} />
                  <input type="text" placeholder='topico' value={mqtt.topic} onChange={this.changeMqttStateValue.bind(this)} />
                  <input type="text" placeholder='cliente' value={mqtt.clienteId} onChange={this.changeMqttStateValue.bind(this)} />
                  <input type="text" placeholder='usuario' name="usuario" autoComplete="off" value={mqtt.username} onChange={this.changeMqttStateValue.bind(this)} />
                  <input type="text" placeholder='password' name="password" autoComplete="off" value={mqtt.password} onChange={this.changeMqttStateValue.bind(this)} />
                </Fragment>)
              }
            </div>
            <div className='buttons'>
              <input type="submit" value="salvar" />
              <Link to="/dispositivos">cancelar</Link>
            </div>
          </form>
        </div>
      </Fragment>
    )
  }
}
