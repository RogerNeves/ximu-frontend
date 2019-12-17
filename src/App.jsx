import React from 'react';
import {BrowserRouter as Router, Redirect} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'


import Login from './pages/Login'
import Register from './pages/Register'
import Devices from './pages/Devices'
import Models from './pages/Models'
import Dashboard from './pages/Dashboard'

import './css/item.css'
import './css/addForm.css'
import './css/button.css'
import './css/general.css'
import './css/grid.css'
import './css/menu.css'



function App() {
  return (
    <Router>
      <PublicRoute path="/login" exact component={Login}/>
      <PublicRoute path="/register" exact component={Register}/>
      <PrivateRoute path="/" exact component={()=>(<Redirect to="/dispositivos"/>)}/>
      <PrivateRoute path="/dashboard/:id" exact component={Dashboard}/>
      <PrivateRoute path="/dashboard/:id/view/:idView" component={Dashboard}/>
      <PrivateRoute path="/modelos" exact component={Models}/>
      <PrivateRoute path="/modelos/:id" component={Models}/>
      <PrivateRoute path="/dispositivos" exact component={Devices}/>
      <PrivateRoute path="/dispositivos/:id" component={Devices}/>
    </Router>
  );
}

export default App;
