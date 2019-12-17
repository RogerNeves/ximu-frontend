import React, { Component, Fragment } from "react";

// import { Container } from './styles';

export default class BarForm extends Component {
  constructor(props) {
    super(props);
    this.view = props.view;
    this.state = {
      bar: {
        type: undefined,
        idDevice: 0,
        modelsData: 0,
        divider:0
      },
      devices: [
        { id: 1, name: "casa" },
        { id: 2, name: "estufa" }
      ],
      modelsData: [
        { id: 1, name: "temperatura" },
        { id: 2, name: "humidade" }
      ]
    };
  }

  changeBarStateValue(e) {
    const { name, value } = e.target;
    let { bar } = this.state;
    bar[name] = value;
    this.setState({
      bar
    });
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
