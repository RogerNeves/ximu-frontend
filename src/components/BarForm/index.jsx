import React, { Component, Fragment } from "react";
import { Link } from 'react-router-dom'

import BackEndApi from '../../BackEndApi'

export default class BarForm extends Component {
  constructor(props) {
    super(props);
    this.idDashboard = props.idDashboard
    this.backEndApi = new BackEndApi();
    this.state = {
      bar: {
        dataStyle: undefined,
        idDevice: 0,
        data: 0,
        divider: 0,
        dateStyle: ""
      },
      devices: [],
      modelsData: []
    };
  }

  async componentDidMount() {
    const devices = await this.backEndApi.getDevices()
    this.setState(devices)
  }

  async submitBarForm(e) {
    e.preventDefault()
    const { view } = this.props
    const { bar } = this.state
    const { dataStyle, idDevice, data, divider } = bar
    const { name } = view
    view.idDevice = idDevice
    console.log(view, bar)
    if (dataStyle && data && idDevice && divider && name) {
      const response = await this.backEndApi.postBar(view, bar)
      this.props.history.push(`/dashboard/${this.idDashboard}`)
    }
  }

  async changeBarStateValue(e) {
    const { name, value } = e.target;
    let { bar } = this.state;
    bar[name] = value;
    this.setState({
      bar
    });
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
    const { bar, devices, modelsData } = this.state;
    return (
      <Fragment>
        <div className="div-form">
          <p>Dispositivo:</p>
          <select value={bar.idDevice} onChange={this.changeBarStateValue.bind(this)} name="idDevice">
            <option value={0}>Selecione um dispositivo</option>
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
            value={bar.data}
            onChange={this.changeBarStateValue.bind(this)}
            name="data"
          >
            {modelsData.map((data, index) => (
              <option value={data.id} key={index} idModel={data.IdModels}>
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
            name="dataStyle"
            value={bar.dataStyle}
            onChange={this.changeBarStateValue.bind(this)}
          >
            <option value="0">Selecione a apresentação</option>
            <option value="sum">Soma</option>
            <option value="media">Media</option>
            <option value="dateSum">Soma por data</option>
            <option value="dateMedia">Media por data</option>
          </select>
        </div>
        {bar.dataStyle == "dateSum" || bar.dataStyle == "dateMedia" ? (
          <div className="div-form">
            <p>Estilo da data</p>
            <input value={bar.dateStyle} placeholder="DD/MM/YYYY hh:mm" name="dateStyle" onChange={this.changeBarStateValue.bind(this)} />
          </div>
        ) : null}
        <div className="buttons">
          <input type="submit" value="Salvar" className="save-button" onClick={this.submitBarForm.bind(this)} />
          <Link to={`/dashboard/${this.idDashboard}`} className="cancel-button">Cancelar</Link>
        </div>
      </Fragment>
    );
  }
}
