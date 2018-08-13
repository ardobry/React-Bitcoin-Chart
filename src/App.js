import React, { Component } from 'react';
import './App.css';
import Chart from './components/LineChart';
import Info from './components/Info';
import axios from 'axios';
import moment from 'moment';


class App extends Component {
  constructor(){
    super();
    this.state = {
      data:{}
    }
  }

  componentWillMount(){
    this.getChartData();    
  }

  getChartData(){
    axios.get("https://api.coindesk.com/v1/bpi/historical/close.json")
    .then(res => {
      const sortedData = [];
      let count = 0;
      for (let date in res.data.bpi){
        sortedData.push({
          d: moment(date).format('MMM DD'),
          p: res.data.bpi[date].toLocaleString('us-EN',{ style: 'currency', currency: 'USD' }),
          x: count, //previous days
          y: res.data.bpi[date] // numerical price
        });
        count++;
      }

      const labelArray = sortedData.filter( (label, index) => {
        return index % 5 === 0;
      });
      labelArray.forEach( (item, index) => {labelArray[index] = item.d});
      
      const dsData = sortedData.map( item => item.p);
      

      const dsD = dsData.map( item => {
        let r = item.slice(1);
        let t = r.slice(0,1) + r.slice(2, r.length);
        return parseInt(t, 10);
      });
      
      const testDateObj = sortedData.map( item => item.d );
      this.setState({
        data: {      
          labels: testDateObj,
          datasets: [
            {
              label: 'Price to USD ',       backgroundColor:'rgba(254,236,198,0.6)',
              borderWidth:3,
              borderColor: '#F6A93F',
              hoverBorderWidth: 3,
              hoverBorderColor: '#000',
              data: dsD,
            }
          ],
        },
        dt: sortedData[0].y,
      }); 
    });
  }

  render() {
    return (
      <div style={{padding: "0 150px", maxHeight: "500px"}} className="App">
        <h1 style={{color: "#70747f"}}>Bitcoin price 30-day chart</h1>
        <Info pass={this.state.dt}/>
        <Chart chartData={this.state.data} legendPosition="bottom" legendText="© to Har8"/>
        <div style={{color: "#70747f"}}> <span style={{color: "#222"}}>&copy;</span> to Har8</div>
      </div>
    );
  }
}

export default App;
