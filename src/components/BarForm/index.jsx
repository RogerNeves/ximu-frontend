import React, { Component, Fragment } from "react";

import BackEndApi from '../../BackEndApi'

export default class BarForm extends Component {
  constructor(props) {
    super(props);
    this.backEndApi = new BackEndApi();
    this.state = {
      bar: {
        type: undefined,
        idDevice: 0,
        modelsData: 0,
        divider:0
      },
      devices: [
        { id: 1, name: "casa", idModel: 1 },
        { id: 2, name: "estufa", idModel: 2 }
      ],
      modelsData: [
        { id: 1, name: "temperatura", idModel: 1 },
        { id: 2, name: "humidade",idModel: 2 }
      ]
    };
  }

  async submitBarForm(){
    const {view} = this.props
    const {bar} = this.state
    const { type, idDevice, modelsData, divider } = bar
    const {name} = view
    if( type || modelsData || idDevice || divider || name){
      const response = await this.backEndApi.postBar( view , bar )
    }
  }

  async changeBarStateValue(e) {
    const { name, value } = e.target;
    let { bar } = this.state;
    bar[name] = value;
    this.setState({
      bar
    });
    if(name === 'idDevice'){
      const modelsData = await this.backEndApi.getModelsData(value)
      if(modelsData.success){
        this.setState({
          modelsData:modelsData.modelsData
        })
      }
    }
  }

  render() {
    const { bar, devices, modelsData } = this.state;
    return (
      <Fragment>
        <div className="div-form">
          <p>Dispositivo:</p>
          <select
            value={bar.idDevice}
            onChange={this.changeBarStateValue.bind(this)}
            name="idDevice"
          >
            {devices.map((device, index) => (
              <option value={device.id} key={index}>
                {device.name}
              </option>
            ))}
          </select>
        </div>
        <div className="div-form">
          <p>Dado apresentado:</p>
          <select
            value={bar.modelsData}
            onChange={this.changeBarStateValue.bind(this)}
            name="modelsData"
          >
            {modelsData.map((data, index) => (
              <option value={data.id} key={index}>
                {data.name}
              </option>
            ))}
          </select>
        </div>
        <div className="div-form">
          <p>Dado divisor:</p>
          <select
            value={bar.divider}
            onChange={this.changeBarStateValue.bind(this)}
            name="divider"
          >
            {modelsData.map((data, index) => (
              <option value={data.id} key={index}>
                {data.name}
              </option>
            ))}
          </select>
        </div>
        <div className="div-form">
          <p>Apresentação dos dados:</p>
          <select
            name="type"
            value={bar.type}
            onChange={this.changeBarStateValue.bind(this)}
          >
            <option value="sum">Soma</option>
            <option value="media">Media</option>
            <option value="dateSum">Soma por data</option>
            <option value="dateMedia">Media por data</option>
          </select>
        </div>
      </Fragment>
    );
  }
}
