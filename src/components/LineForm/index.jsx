import React, { Component, Fragment } from 'react';

// import { Container } from './styles';

export default class LineForm extends Component {
  constructor(props){
    super(props)
    this.view = props.view
    this.state = {
      line:{
      type:undefined,
      idDevice:0,
      modelsData:0,
      divider:0
      },
      devices:[{id:1,name:"casa"},{id:2,name:"estufa"}],
      modelsData:[{id:1,name:"temperatura"},{id:2,name:"humidade"}]
    }
  }

  changeLineStateValue(e) {
    const { name, value } = e.target
    let { line } = this.state
    line[name]=value
    this.setState({
      line
    })
  }

  render() {
    const { line, devices, modelsData } = this.state
    return (
      <Fragment>
        <div className="div-form">
          <p>Dispositivo: </p>
        <select value={line.idDevice} onChange={this.changeLineStateValue.bind(this)} name="idDevice">
          {devices.map(( device, index )=>(
            <option value={device.id} key={index} >{device.name}</option>
          ))}
        </select>
        </div>
        <div className="div-form">
          <p>Dado apresentado:</p>
        <select value={line.modelsData} onChange={this.changeLineStateValue.bind(this)} name="modelsData">
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
        <select name="type" value={line.type} onChange={this.changeLineStateValue.bind(this)}>
          <option value="sum">Soma</option>
          <option value="media">Media</option>
          <option value="dateSum">Soma por data</option>
          <option value="dateMedia">Media por data</option>
        </select>
        </div>
      </Fragment>
    )
  }
}
