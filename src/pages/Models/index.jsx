import React, { Component, Fragment } from 'react';
import BackEndApi from '../../BackEndApi'


import NavBar from '../../components/NavBar'
import AddButton from '../../components/AddButton'
import ModelsItem from '../../components/ModelsItem'
import ModelsForm from '../../components/ModelsForm'


export default class Models extends Component {
  constructor(props){
    super(props)
    this.id = props.match.params.id || null
    this.backEndApi = new BackEndApi()
    this.state = {
      models:[]
    }
  }

  async componentDidMount(){
    const resp = await this.backEndApi.getModels()
    if (resp.success) {
      this.setState({
        models: resp.models
      })
    }
  }

  render() {
    const {models} = this.state
    return (
      <Fragment>
        <NavBar />
        <section>
          <div className='section-wrap'>
            {models.map((model, index) => (
              <ModelsItem path='modelos' model={model} key={index} />
            ))}
            <AddButton path='modelos' />
          </div>
          {this.id && <ModelsForm path='Dispositivo' idModel={this.id} history={this.props.history} />}
        </section>
      </Fragment>
    )
  }
}
