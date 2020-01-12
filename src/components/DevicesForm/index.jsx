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
        IdModels: null,
        protocol: "http"
      }
    }
  }

  async componentDidMount() {
    const respModels = await this.backEndApi.getModels()
    if (respModels.success) {
      this.setState({ models: respModels.models })
    }
    if (this.id >0) {
      const deviceResp = await this.backEndApi.getDevice(this.id)
      if(deviceResp.success)
      this.setState({ device:deviceResp.device })
      if (deviceResp.device.protocol == "mqtt") {
        const mqtt = await this.backEndApi.getMqtt(this.id)
        if (mqtt.success)
          this.setState({ mqtt:mqtt.mqtt })
      }
    }
  }

  async sendDevice(e) {
    e.preventDefault()
    const { device, mqtt, mqttTest } = this.state    
    if (this.id==='new')
      await this.backEndApi.postDevice(device)
    else
      await this.backEndApi.putDevice(device)
    if (mqtt.id && mqttTest)
      await this.backEndApi.postMqtt(mqtt)
    else if (mqttTest)
      await this.backEndApi.putMqtt(mqtt, mqtt.id)
    this.props.history.push('/dispositivos')
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
    return (
      <Fragment>
        <DialogBoxBackground close={close} />
        <div className="add-form">
          <form onSubmit={this.sendDevice.bind(this)} className="add-form">
            <input type="text" name="name" id="add-name" value={device.name} required onChange={this.changeDevicesStateValue.bind(this)} />
            <select value={device.IdModels || 0} name="IdModels" required onChange={this.changeDevicesStateValue.bind(this)}>
              <option value={0}>Selecione um modelo</option>
              {models.map((model, index) => (
                <option value={model.id} key={index}>{model.name}</option>
              ))}
            </select>
            <select value={device.protocol || "http"} name="protocol" required onChange={this.changeDevicesStateValue.bind(this)}>
                <option value="http">http</option>
                <option value="mqtt">mqtt</option>
            </select>
            <div className='mqtt-form'>
              {(device.protocol == "mqtt" &&
                (<Fragment>
                  <input type="text" className="input-mqtt-form" placeholder='url do broker' name="url" value={mqtt.url} onChange={this.changeMqttStateValue.bind(this)} />
                  <input type="number" className="input-mqtt-form" placeholder='porta' name="port" value={mqtt.port} onChange={this.changeMqttStateValue.bind(this)} />
                  <input type="text" className="input-mqtt-form" placeholder='topico' name="topic" value={mqtt.topic} onChange={this.changeMqttStateValue.bind(this)} />
                  <input type="text" className="input-mqtt-form" placeholder='cliente' name="clienteId" value={mqtt.clienteId} onChange={this.changeMqttStateValue.bind(this)} />
                  <input type="text" className="input-mqtt-form" placeholder='usuario' name="username" autoComplete="off" value={mqtt.username} onChange={this.changeMqttStateValue.bind(this)} />
                  <input type="text" className="input-mqtt-form" placeholder='password' name="password" autoComplete="off" value={mqtt.password} onChange={this.changeMqttStateValue.bind(this)} />
                </Fragment>)) || (
                  <Fragment>
                    <p> envie os dados como metodo "POST" para: localhost:3000/meansuraments</p>
                  </Fragment>
                )
              }
            </div>
            <div className='buttons'>
              <input type="submit" value="salvar" className="save-button" />
              <Link to="/dispositivos" className="cancel-button">cancelar</Link>
            </div>
          </form>
        </div>
      </Fragment>
    )
  }
}
