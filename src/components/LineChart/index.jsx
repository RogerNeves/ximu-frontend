import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts'
import BackEndApi from '../../BackEndApi'
import DataApi from '../../DataApi'


// import { Container } from './styles';

export default class LineChart extends Component {

  constructor(props) {
    super(props);
    this.backEndApi = new BackEndApi()
    this.dataApi = new DataApi()
    this.view = props.view
    this.state = {
      line: {},
      options: {
        chart: {
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: props.view.name,
          align: 'left'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        xaxis: {
          categories: [],
        }
      },
      series: [{
        name: '',
        data: []
      }],
    }
  }

  async componentDidMount() {
    const resp = await this.backEndApi.getLine(this.view.id)
    console.log(resp)
    if (resp.success) {
      console.log(resp.line)
      this.setState({
        line: resp.line
      })
    }
    this.getDatas()
    setInterval(this.getDatas.bind(this), 10000)
  }

  async getDatas() {
    const { line } = this.state
    const resp = await this.backEndApi.getMeansurements(this.view.idDevice)
    if (resp.success) {
      const info = this.dataApi.dataFormater(resp.datas, line)
      if (info.categories.length > 10) {
        info.categories = info.categories.slice(info.categories.length - 10)
        info.datas = info.datas.slice(info.datas.length - 10)
      }
      this.setState(prevState => ({
        options: { xaxis: { categories: info.categories } },
        series: [{ data: info.datas }]
      }))
    }
  }

  render() {

    return (
      <div id="chart" className="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="line" height="250" />
      </div>
    )
  }
}
