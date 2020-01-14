import React, { Component, Fragment } from 'react'
import {Link} from 'react-router-dom'
import DialogBoxBackground from '../DialogBoxBackground'
import GaugeForm from '../GaugeForm'
import BarForm from '../BarForm'
import LineForm from '../LineForm'
import RadarForm from '../RadarForm'

export default class ViewForm extends Component {
  constructor(props){
    super(props)
    this.idDashboard = props.idDashboard
    this.idView = props.idView
    this.state = {
      id:props.id,
      name:"",
      type:"gauge",
      idDashboard :props.idDashboard
    }
  }

  submitView(e){
    e.preventDefault()
    console.log(e)
  }

  handleStateChange(e) {
    const { name, value } = e.target
    this.setState(({
      [name]: value
    }))
  }

  form(){
    switch (this.state.type) {
      case "gauge":
        return(<GaugeForm idDashboard={this.idDashboard} history={this.props.history} view={this.state}/>)
      case "bar":
        return(<BarForm idDashboard={this.idDashboard} history={this.props.history} view={this.state}/>)
      case "line":
        return(<LineForm idDashboard={this.idDashboard} history={this.props.history} view={this.state}/>)
      case "radar":
        return(<RadarForm idDashboard={this.idDashboard} history={this.props.history} view={this.state}/>)
      default:
        break;
    }
  }

  render() {
    const {name, type} = this.state
    return(
      <Fragment>
        <DialogBoxBackground close={`dashboard/${this.idDashboard}`}/>
        <form action="" className="add-form view-form" onSubmit={this.submitView.bind(this)}> 
          <input type="text" value={name} name="name" id="add-name" placeholder="Nome da visualização" onChange={this.handleStateChange.bind(this)}/>
          <div className="view-container">
          <div className="div-form">
            <p>Tipo de Gráfico: </p>
            <select value={type} name="type" onChange={this.handleStateChange.bind(this)}>
              <option value="gauge">Gauge</option>
              <option value="line">Gráfico de Linha</option>
              <option value="bar">Gráfico de Barra</option>
              <option value="radar">Gráfico de Radar</option>
            </select>
          </div>
          { this.form() }
          </div>
        </form>
      </Fragment>
    );
  }
}
