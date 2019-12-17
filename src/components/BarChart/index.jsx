import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts'
import BackEndApi from '../../BackEndApi'
import DataApi from '../../DataApi'


// import { Container } from './styles';

export default class BarChart extends Component {
  constructor(props) {
    super(props);
    this.backEndApi = new BackEndApi()
    this.dataApi = new DataApi()
    this.view = props.view
    this.state = {
      bar: {},
      options: {
        plotOptions: {
          bar: {
            dataLabels: {
              position: 'top', // top, center, bottom
            },
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val + "";
          },
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ["#304758"]
          }
        },
        xaxis: {
          categories: [],
          position: 'top',
          labels: {
            offsetY: -18,
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              }
            }
          },
          tooltip: {
            enabled: true,
            offsetY: -35,
          }
        },
        fill: {
          gradient: {
            shade: 'light',
            type: "horizontal",
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [50, 0, 100, 100]
          },
        },
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (val) {
              return val + "";
            }
          }
        },
        title: {
          text: props.view.name,
          floating: true,
          offsetY: 320,
          align: 'center',
          style: {
            color: '#444'
          }
        }
      },
      series: [{
        name: '',
        data: []
      }],
    }
  }
  async componentDidMount() {
    const resp = await this.backEndApi.getBar(this.view.id)
    if (resp.success) {
      this.setState({
        bar: resp.bar
      })
    }
    this.getDatas()
    setInterval(this.getDatas.bind(this), 10000)
  }

  async getDatas() {
    const { bar } = this.state
    const resp = await this.backEndApi.getMeansurements(this.view.idDevice)
    if (resp.success) {
      const info = this.dataApi.dataFormater(resp.datas, bar)
      if (info.categories.length > 6) {
        info.categories = info.categories.slice(info.categories.length - 6, 6)
        info.datas = info.datas.slice(info.datas.length - 6, 6)
      }
      this.setState(prevState => ({
        options: { xaxis: { categories: info.categories } },
        series: [{ data: info.datas }]
      }))
    }
  }

  render() {
    console.log(this.state.series)
    return (
      <div id="chart" className="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height="250" />
      </div>
    );
  }
}