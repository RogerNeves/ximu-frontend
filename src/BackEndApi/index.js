import { Component } from 'react'
import Axios from 'axios'

export default class BackEndApi extends Component {
  BASE_URL = 'http://localhost:3001'

  login(email, password) {
    const url = `${this.BASE_URL}/login/singin`
    if (email && password) {
      return Axios.post(url, {
        singin: {
          email,
          password
        }
      }).then(resp => {
        localStorage.setItem('Authorization', resp.data.Authorization)
        return { success: true }
      }).catch(error => {
        return { success: false, error }
      })
    }
  }

  register({ name, email, password, confirmPassword }) {
    const url = `${this.BASE_URL}/login/singup`
    if (((name && email) && password) && (password === confirmPassword)) {
      return Axios.post(url, {
        singup: {
          name, email, password, confirmPassword
        }
      })
        .then(() => {
          return { success: true }
        }).catch(error => {
          return { success: false, error }
        })
    }
  }

  getDashboards() {
    const url = `${this.BASE_URL}/dashboard/`
    const Authorization = localStorage.getItem('Authorization')
    return Axios.get(url, {
      headers: {
        Authorization
      }
    }).then(resp => {
      return { success: true, dashboardList: resp.data }
    }).catch(error => {
      return { success: false, error }
    })
  }

  getDashboard(id) {
    const url = `${this.BASE_URL}/dashboard?id=${id}`
    return Axios.get(url, {
      headers: {
        Authorization: localStorage.getItem('Authorization')
      }
    }).then(resp => {
      return { success: true, dashboard: resp.data }
    }).catch(error => {
      return { success: false, error }
    })
  }

  postDashboard(dashboard) {
    const url = `${this.BASE_URL}/dashboard/`
    return Axios.post(url,{dashboard}, {
      headers: {
        Authorization: localStorage.getItem('Authorization')
      }
    }).then(resp => {
      return { success: true, dashboard: resp.data }
    }).catch(error => {
      return { success: false, error }
    })
  }

  putDashboard(dashboard, id) {
    const url = `${this.BASE_URL}/dashboard/${id}`
    return Axios.put(url, {
      headers: {
        Authorization: localStorage.getItem('Authorization')
      },
      data: {
        dashboard
      }
    }).then(resp => {
      return { success: true, dashboard: resp.data }
    }).catch(error => {
      return { success: false, error }
    })
  }

  deleteDashboard(id) {
    const url = `${this.BASE_URL}/dashboard/${id}`
    return Axios.delete(url, {
      headers: {
        Authorization: localStorage.getItem('Authorization')
      }
    }).then(resp => {
      return { success: true }
    }).catch(error => {
      return { success: false, error }
    })
  }

  getViews(idDashboard) {
    const url = `${this.BASE_URL}/views?idDashboard=${idDashboard}`
    return Axios.get(url, {
      headers: {
        Authorization: localStorage.getItem('Authorization')
      }
    }).then(resp => {
      return { success: true, views: resp.data }
    }).catch(error => {
      return { success: false, error }
    })
  }

  getView(id) {
    const url = `${this.BASE_URL}/views?id=${id}`
    return Axios.get(url, {
      headers: {
        Authorization: localStorage.getItem('Authorization')
      }
    }).then(resp => {
      return { success: true, view: resp.data }
    }).catch(error => {
      return { success: false, error }
    })
  }

  postView(view) {
    const url = `${this.BASE_URL}/views/`
    return Axios.post(url, {
      headers: {
        Authorization: localStorage.getItem('Authorization')
      },
      data: {
        view
      }
    }).then(resp => {
      return { success: true, view: resp.data }
    }).catch(error => {
      return { success: false, error }
    })
  }

  putView(view, id) {
    const url = `${this.BASE_URL}/views/${id}`
    return Axios.put(url, {
      headers: {
        Authorization: localStorage.getItem('Authorization')
      },
      data: {
        view
      }
    }).then(resp => {
      return { success: true, view: resp.data }
    }).catch(error => {
      return { success: false, error }
    })
  }

  deleteView(id) {
    const url = `${this.BASE_URL}/views/${id}`
    return Axios.delete(url, {
      headers: {
        Authorization: localStorage.getItem('Authorization')
      }
    }).then(resp => {
      return { success: true }
    }).catch(error => {
      return { success: false, error }
    })
  }

  getDevices() {
    const url = `${this.BASE_URL}/devices/`
    return Axios.get(url, {
      headers: {
        Authorization: localStorage.getItem('Authorization')
      }
    }).then(resp => {
      return { success: true, devices: resp.data }
    }).catch(error => {
      return { success: false, error }
    })
  }

  getDevice(id) {
    const url = `${this.BASE_URL}/devices?id=${id}`
    return Axios.get(url, {
      headers: {
        Authorization: localStorage.getItem('Authorization')
      }
    }).then(resp => {
      return { success: true, device: resp.data }
    }).catch(error => {
      return { success: false, error }
    })
  }

  postDevice(device) {
    const url = `${this.BASE_URL}/devices/`
    return Axios.post(url, {device},{
      headers: {
        Authorization: localStorage.getItem('Authorization')
      }
    }).then(resp => {
      return { success: true, device: resp.data }
    }).catch(error => {
      return { success: false, error }
    })
  }

  putDevice(device, id) {
    const url = `${this.BASE_URL}/devices/`
    return Axios.put(url, {device},{
      headers: {
        Authorization: localStorage.getItem('Authorization')
      }
    }).then(resp => {
      return { success: true, device: resp.data }
    }).catch(error => {
      return { success: false, error }
    })
  }

  deleteDevice(id) {
    const url = `${this.BASE_URL}/devices/${id}`
    return Axios.delete(url, {
      headers: {
        Authorization: localStorage.getItem('Authorization')
      }
    }).then(resp => {
      return { success: true }
    }).catch(error => {
      return { success: false, error }
    })
  }

  getModels() {
    const url = `${this.BASE_URL}/models/`
    return Axios.get(url, {
      headers: {
        Authorization: localStorage.getItem('Authorization')
      }
    }).then(resp => {
      return { success: true, models: resp.data }
    }).catch(error => {
      return { success: false, error }
    })
  }

  getModel(id) {
    const url = `${this.BASE_URL}/models?id=${id}`
    return Axios.get(url, {
      headers: {
        Authorization: localStorage.getItem('Authorization')
      }
    }).then(resp => {
      return { success: true, model: resp.data }
    }).catch(error => {
      return { success: false, error }
    })
  }

  postModel(model, datas) {
    const url = `${this.BASE_URL}/models/`
    return Axios.post(url, {
      model, datas
    }, {
      headers: {
        authorization: localStorage.getItem('Authorization')
      }
    },
    ).then(resp => {
      return { success: true, model: resp.data }
    }).catch(error => {
      return { success: false, error }
    })
  }

  putModel(model) {
    const url = `${this.BASE_URL}/models`
    return Axios.put(url, {
      model
    }, {
      headers: {
        authorization: localStorage.getItem('Authorization')
      }
    }).then(resp => {
      return { success: true, model: resp.data }
    }).catch(error => {
      return { success: false, error }
    })
  }

  deleteModel(id) {
    const url = `${this.BASE_URL}/models/${id}`
    return Axios.delete(url, {
      headers: {
        Authorization: localStorage.getItem('Authorization')
      }
    }).then(resp => {
      return { success: true }
    }).catch(error => {
      return { success: false, error }
    })
  }
  getDataTypes() {
    const url = `${this.BASE_URL}/dataTypes`
    return Axios.get(url, {
      headers: {
        Authorization: localStorage.getItem('Authorization')
      }
    }).then(resp => {
      return { success: true, dataTypes: resp.data }
    }).catch(error => {
      return { success: false, error }
    })
  }

  getModelsData(id) {
    const url = `${this.BASE_URL}/modelsData?idModel=${id}`
    return Axios.get(url, {
      headers: {
        Authorization: localStorage.getItem('Authorization')
      }
    }).then(resp => {
      return { success: true, modelsData: resp.data }
    }).catch(error => {
      return { success: false, error }
    })
  }

  putModelsData(modelsData) {
    const url = `${this.BASE_URL}/modelsData/`
    return Axios.put(url, {
      datas:modelsData
    }, {
      headers: {
        authorization: localStorage.getItem('Authorization')
      }
    }).then(resp => {
      return { success: true, model: resp.data }
    }).catch(error => {
      return { success: false, error }
    })
  }

  deleteModelsData(id) {
    const url = `${this.BASE_URL}/models/${id}`
    return Axios.delete(url, {
      headers: {
        Authorization: localStorage.getItem('Authorization')
      }
    }).then(resp => {
      return { success: true }
    }).catch(error => {
      return { success: false, error }
    })
  }

  getMqtt(id) {
    const url = `${this.BASE_URL}/mqtt/${id}`
    return Axios.get(url, {
      headers: {
        Authorization: localStorage.getItem('Authorization')
      }
    }).then(resp => {
      return { success: true, mqtt: resp.data }
    }).catch(error => {
      return { success: false, error }
    })
  }

  postMqtt(mqtt) {
    const url = `${this.BASE_URL}/mqtt/`
    return Axios.post(url, {
      headers: {
        Authorization: localStorage.getItem('Authorization')
      },
      data: {
        mqtt
      }
    }).then(resp => {
      return { success: true, mqtt: resp.data }
    }).catch(error => {
      return { success: false, error }
    })
  }

  putMqtt(mqtt) {
    const url = `${this.BASE_URL}/mqtt`
    return Axios.put(url, {
      headers: {
        Authorization: localStorage.getItem('Authorization')
      },
      data: {
        mqtt
      }
    }).then(resp => {
      return { success: true, mqtt: resp.data }
    }).catch(error => {
      return { success: false, error }
    })
  }

  deleteMqtt(id) {
    const url = `${this.BASE_URL}/mqtt/${id}`
    return Axios.delete(url, {
      headers: {
        Authorization: localStorage.getItem('Authorization')
      }
    }).then(resp => {
      return { success: true }
    }).catch(error => {
      return { success: false, error }
    })
  }

  getBar(id) {
    const url = `${this.BASE_URL}/bars/${id}`
    return Axios.get(url, {
      headers: {
        Authorization: localStorage.getItem('Authorization')
      }
    }).then(resp => {
      return { success: true, bar: resp.data }
    }).catch(error => {
      return { success: false, error }
    })
  }

  getLine(id) {
    const url = `${this.BASE_URL}/lines/${id}`
    return Axios.get(url, {
      headers: {
        Authorization: localStorage.getItem('Authorization')
      }
    }).then(resp => {
      return { success: true, line: resp.data }
    }).catch(error => {
      return { success: false, error }
    })
  }

  getRadar(id) {
    const url = `${this.BASE_URL}/radars/${id}`
    return Axios.get(url, {
      headers: {
        Authorization: localStorage.getItem('Authorization')
      }
    }).then(resp => {
      return { success: true, radar: resp.data }
    }).catch(error => {
      return { success: false, error }
    })
  }
  getGauge(id) {
    const url = `${this.BASE_URL}/gauges/${id}`
    return Axios.get(url, {
      headers: {
        Authorization: localStorage.getItem('Authorization')
      }
    }).then(resp => {
      return { success: true, gauge: resp.data }
    }).catch(error => {
      return { success: false, error }
    })
  }
  getMeansurements(id) {
    const url = `${this.BASE_URL}/meansurementsget/${id}`
    return Axios.get(url, {
      headers: {
        Authorization: localStorage.getItem('Authorization')
      }
    }).then(resp => {
      return { success: true, datas: resp.data.message }
    }).catch(error => {
      return { success: false, error }
    })
  }
}