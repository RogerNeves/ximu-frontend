import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

import BackEndApi from '../../BackEndApi'
import DialogBoxBackground from '../DialogBoxBackground'

export default class ModelsForm extends Component {
  constructor(props) {
    super(props)
    this.backEndApi = new BackEndApi()
    this.id = props.idModel
    this.state = {
      model: {
        id: props.id,
        name: ''
      },
      dataTypes: [],
      datas: [
        {
          id: null,
          name: '',
          idDataType: -1,
          IdModel: props.id
        }
      ]
    }
  }

  async componentDidMount() {
    if (this.id !== 'new') {
      const resp = await this.backEndApi.getModel(this.id)
      if (resp.success) {
        this.setState({
          model: resp.model
        })
      }
    }
    const respDataTypes = await this.backEndApi.getDataTypes(this.id)
    if (respDataTypes.success) {
      this.setState({
        dataTypes: respDataTypes.dataTypes
      })
    }
    const respDatas = await this.backEndApi.getModelsData(this.id)
    if(respDatas.success){
      this.setState({
        datas:respDatas.modelsData
      })
    }

  }

  async submitModel(e) {
    e.preventDefault()
    const {model,datas} = this.state
    if (this.id==="new") {
      await this.backEndApi.postModel(model,datas)
    }
    else if(this.id >= 0){
      await this.backEndApi.putModel(model)
      await this.backEndApi.putModelsData(datas)
    }
    this.props.history.push('/modelos')
  }

  changeModel(e) {
    const { name, value } = e.target
    this.setState(prevState => ({
      model: {
        ...prevState.model,
        [name]: value
      }
    }))
  }

  changeDataName(evt) {
    let { datas } = this.state
    datas[evt.target.id].name = evt.target.value
    this.setState({
      datas
    })
  }
  changeDataType(evt) {
    let { datas } = this.state
    datas[evt.target.id].idDataType = evt.target.value
    this.setState({
      datas
    })
  }

  AddData(e) {
    e.preventDefault()
    const { datas } = this.state
    datas.push({
      id: null,
      name: '',
      idDataType: -1,
      IdModel: this.id
    })
    this.setState({
      datas
    })
  }

  render() {
    const { model, dataTypes, datas } = this.state
    return (
      <Fragment>
        <DialogBoxBackground close="modelos"/>
        <form onSubmit={this.submitModel.bind(this)} className="add-form">
          
            <input type="text" name="name" id="add-name" placeholder="Nome do modelo" value={model.name} onChange={this.changeModel.bind(this)} />
            <h3>Dados:</h3>
            <div className="data-form">
            {datas.map((data, index) => (
              <Fragment key={index}>
                <div className="data-input">
                <input type="text" name="dataName" readOnly={data.name =="createAt"?true:false} id={index} value={data.name} onChange={this.changeDataName.bind(this)} />
                <select name="dataTypes" id={index} value={data.idDataType} readOnly={data.name =="createAt"?true:false} onChange={this.changeDataType.bind(this)}>
                  <option value={-1}>Selecione um tipo</option>
                  {dataTypes.map((dataType, index) => (
                    <option value={dataType.id} key={index} id={index}>{dataType.type}</option>
                  ))}
                </select>
                </div>
              </Fragment>
            ))}
            <button className="button-add-type" onClick={this.AddData.bind(this)} >+</button>
            </div>
          
          <div className="buttons">
            <input type="submit" value="Salvar" className="save-button"/>
            <Link to="/modelos" className="cancel-button">Cancelar</Link>
          </div>
        </form>
      </Fragment>
    )
  }
}