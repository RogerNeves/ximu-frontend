import React, { Component } from 'react';
import BackEndApi from '../../BackEndApi'

//import Logo from './img/logo1.png'

// import { Container } from './styles';

export default class Singup extends Component {
  constructor(props) {
    super(props)
    this.backEndApi = new BackEndApi()
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }
  
  async subimitSingup(e){
    e.preventDefault()
    await this.backEndApi.register(this.state)
    this.props.history.push("/login")
  }

  changeStateValue(e) {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  render() {
    const { name, email, password, confirmPassword} = this.state
    return (
      <section className="sec-login">
        <div className='container-login'>
          {//<div><img src={Logo} alt="" /></div>
          }
          <form onSubmit={this.subimitSingup.bind(this)}>
          <input type="name" placeholder="Nome" name="name" onChange={this.changeStateValue.bind(this)} value={name}/>
          <input type="email" placeholder="Email" name="email" onChange={this.changeStateValue.bind(this)} value={email}/>
          <input type="password" placeholder="Password" name="password" onChange={this.changeStateValue.bind(this)} value={password} />
          <input type="password" placeholder="confirm Password" name="confirmPassword" onChange={this.changeStateValue.bind(this)} value={confirmPassword}/>
          <input type="submit" value="Cadastrar" />
          </form>
          <p>Ainda não é cadastrado? cadastre-se aqui</p>
        </div>
      </section>
    )
  }
}
