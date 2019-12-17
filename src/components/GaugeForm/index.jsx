import React, { Component, Fragment } from "react";

// import { Container } from './styles';

export default class GaugeForm extends Component {
  constructor(props) {
    super(props);
    this.view = props.view;
    this.state = {
      gauge: {
        min: undefined,
        max: undefined,
        type: undefined,
        idDevice: 0,
        modelsData: 0
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

  changeGaugeStateValue(e) {
    const { name, value } = e.target;
    let { gauge } = this.state;
    gauge[name] = value;
    this.setState({
      gauge
    });
  }

  render() {
    const { gauge, devices, modelsData } = this.state;
    return (
      <Fragment>
        <div className="div-form">
          <p>Dispositivo: </p>
          <select
            value={gauge.idDevice}
            onChange={this.changeGaugeStateValue.bind(this)}
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
          <p>Dado apresenteado: </p>
          <select
            value={gauge.modelsData}
            onChange={this.changeGaugeStateValue.bind(this)}
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
          <p>Apresentação do dado</p>
          <select name="type" value={gauge.type}>
            <option value="last">Ultima medição</option>
            <option value="sumDay">Soma do dia</option>
          </select>
        </div>
        <div className="div-form">
          <p>Valor mínimo:</p>
        <input
          type="number"
          name="min"
          value={gauge.min}
          placeholder="min"
          onChange={this.changeGaugeStateValue.bind(this)}
        />
        </div>
        <div className="div-form">
          <p>Valor máximo</p>
        <input
          type="number"
          name="max"
          value={gauge.max}
          placeholder="max"
          onChange={this.changeGaugeStateValue.bind(this)}
        />
        </div>
      </Fragment>
    );
  }
}
