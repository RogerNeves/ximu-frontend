import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom'

import BackEndApi from '../../BackEndApi'

export default class LineForm extends Component {
  constructor(props){
    super(props)
    this.idDashboard = props.idDashboard
    this.backEndApi = new BackEndApi();
    this.state = {
      line:{
        dataStyle:undefined,
        idDevice:0,
        data:0,
        divider:0
      },
      devices:[],
      modelsData:[]
    }
  }

  async componentDidMount() {
    const devices = await this.backEndApi.getDevices()
    this.setState(devices)
  }

  async submitLineForm(){
    const {view} = this.props
    const {line} = this.state
    const { dataStyle, idDevice, data, divider } = line
    const {name} = view
    view.idDevice = idDevice
    console.log(line,view)
    if( dataStyle && data && idDevice && divider && name){
      const response = await this.backEndApi.postLine( view , line )
      this.props.history.push(`/dashboard/${this.idDashboard}`)
    }
  }

  async changeLineStateValue(e) {
    const { name, value } = e.target
    let { line } = this.state
    line[name]=value
    this.setState({
      line
    })
    if (name === 'idDevice') {
      const modelsData = await this.backEndApi.getModelsDataByDevice(value)
      if (modelsData.success) {
        this.setState({
          modelsData: modelsData.modelsData
        })
      }
    }
  }

  render() {
    const { line, devices, modelsData } = this.state
    return (
      <Fragment>
        <div className="div-form">
          <p>Dispositivo: </p>
        <select value={line.idDevice} onChange={this.changeLineStateValue.bind(this)} name="idDevice">
          <option value={0}>Selecione um dispositivo</option>
          {devices.map(( device, index )=>(
            <option value={device.id} key={index} >{device.name}</option>
          ))}
        </select>
        </div>
        <div className="div-form">
          <p>Dado apresentado:</p>
        <select value={line.data} onChange={this.changeLineStateValue.bind(this)} name="data">
          {modelsData.map(( data, index )=>(
            <option value={data.id} key={index} >{data.name}</option>
          ))}
        </select>
        </div>
        <div className="div-form">
          <p>Dado divisor:</p>
        <select value={line.divider} onChange={this.changeLineStateValue.bind(this)} name="divider">
          {modelsData.map(( data, index )=>(
            <option value={data.id} key={index} >{data.name}</option>
          ))}
        </select>
        </div>
        <div className="div-form">
          <p>Apresentação dos dados:</p>
        <select name="dataStyle" value={line.dataStyle} onChange={this.changeLineStateValue.bind(this)}>
          <option value="sum">Soma</option>
          <option value="media">Media</option>
          <option value="dateSum">Soma por data</option>
          <option value="dateMedia">Media por data</option>
        </select>
        </div>
        {line.dataStyle == "dateSum" || line.dataStyle == "dateMedia" ? (
          <div className="div-form">
            <p>Estilo da data</p>
            <input value={line.dateStyle} placeholder="DD/MM/YYYY hh:mm" name="dateStyle" onChange={this.changeLineStateValue.bind(this)} />
          </div>
        ) : null}
        <div className="buttons">
          <input type="submit" value="Salvar" className="save-button" onClick={this.submitLineForm.bind(this)} />
          <Link to={`/dashboard/${this.idDashboard}`} className="cancel-button">Cancelar</Link>
        </div>
      </Fragment>
    )
  }
}
