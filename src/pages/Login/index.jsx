import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import BackEndApi from '../../BackEndApi'


import Logo from './img/logo1.png'


export default class Login extends Component {
  constructor(props) {
    super(props)
    this.backEndApi = new BackEndApi()
    this.state = {
      email: "",
      password: ""
    }
  }

  changeStateValue(e) {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  async subimitSingin(e) {
    e.preventDefault()
    const { email, password } = this.state
    await this.backEndApi.login(email,password)
    this.props.history.push("/login")
  }

  render() {
    return (
      <section className="sec-login">
        <div className='container-login'>
          <div><img src={Logo} alt="" /></div>
          <form onSubmit={this.subimitSingin.bind(this)} method="POST">
          <input type="email" placeholder="Email" name="email" onChange={this.changeStateValue.bind(this)} />
          <input type="password" placeholder="Senha" name="password" onChange={this.changeStateValue.bind(this)} />
          <input type="submit" value="Login"/>
          </form>
          <p>Ainda não é cadastrado? <Link to="register">cadastre-se aqui</Link></p>
        </div>
      </section>
    )
  }
}