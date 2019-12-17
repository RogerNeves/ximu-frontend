import React, { Component, Fragment } from 'react';

// import { Container } from './styles';

export default class RadarForm extends Component {
  constructor(props){
    super(props)
    this.view = props.view
    this.state = {
      radar:{
      type:undefined,
      idDevice1:0,
      idDevice2:0,
      modelsData:0,
      divider:0
      },
      devices:[{id:1,name:"casa"},{id:2,name:"estufa"}],
      modelsData:[{id:1,name:"temperatura"},{id:2,name:"humidade"}]
    }
  }

  changeRadarStateValue(e) {
    const { name, value } = e.target
    let { radar } = this.state
    radar[name]=value
    this.setState({
      radar
    })
  }

  render() {
    const { radar, devices, modelsData } = this.state
    return (
      <Fragment>
        <div className="div-form">
          <p>Dispositivo 1:</p>
        <select value={radar.idDevice} onChange={this.changeRadarStateValue.bind(this)} name="idDevice1">
          {devices.map(( device, index )=>(
            <option value={device.id} key={index} >{device.name}</option>
          ))}
        </select>
        </div>
        <div className="div-form">
          <p>Dispositivo 2:</p>
        <select value={radar.idDevice} onChange={this.changeRadarStateValue.bind(this)} name="idDevice2">
          {devices.map(( device, index )=>(
            <option value={device.id} key={index} >{device.name}</option>
          ))}
        </select>
        </div>
        <div className="div-form">
          <p>Dado apresentado</p>
        <select value={radar.modelsData} onChange={this.changeRadarStateValue.bind(this)} name="modelsData">
          {modelsData.map(( data, index )=>(
            <option value={data.id} key={index} >{data.name}</option>
          ))}
        </select>
        </div>
        <div className="div-form">
          <p>Dado divisor</p>
        <select value={radar.divider} onChange={this.changeRadarStateValue.bind(this)} name="divider">
          {modelsData.map(( data, index )=>(
            <option value={data.id} key={index} >{data.name}</option>
          ))}
        </select>
        </div>
        <div className="div-form">
          <p>Apresentação dos dados</p>
        <select name="type" value={radar.type} onChange={this.changeRadarStateValue.bind(this)}>
          <option value="sum">Soma</option>
          <option value="media">Media</option>
          <option value="dateSum">Soma por data</option>
          <option value="dateMedia">Media por data</option>
        </select></div>
      </Fragment>
    )
  }
}
