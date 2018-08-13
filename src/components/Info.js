import axios from 'axios';
import React, { Component } from "react";
import moment from 'moment';

class Info extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentPrice: null,
            monthChangeD: null,
            monthChangeP: null,
            updatedAt: null
        }
    }



    componentWillMount(){
        this.fetchData = () => {
            const url = 'https://api.coindesk.com/v1/bpi/currentprice.json';
            axios.get(url)
            .then(res => {
                
                const price = res.data.bpi.USD.rate_float;
                const change = price - this.props.pass;
                const changeP = (price - this.props.pass) / this.props.pass * 100;

                this.setState({
                    currentPrice: price,
                    monthChangeD: change.toLocaleString('us-EN', {style: 'currency', currency: "USD"}),
                    monthChangeP: changeP.toFixed(2),
                    updatedAt: moment(res.data.time.updated, 'MMM DD, YYYY hh:mm:ss').format("YYYY-MM-DD hh:mm:ss")
                })
            });
        }
        this.fetchData();
        this.refresh = setInterval(() => this.fetchData(), 90000);          
    }

    componentWillUnmount(){
        clearInterval(this.refresh);
    }

    render(){        
        return (
            <div className="container">
                { this.state.currentPrice ? <div className="one">
                    <div className="data">{this.state.currentPrice.toLocaleString('us-EN',{ style: 'currency', currency: 'USD' })}</div>
                    <div className="info">Updated a few seconds ago</div>
                    {/*Alternative variant: {moment(this.state.updatedAt).fromNow()}  */}
                </div> : null}
                <div className="two">
                    <div className="data">{this.state.monthChangeD}</div>
                    <div className="info">Change Since Last Month (USD) </div>
                </div>
                <div className="three">
                    <div className="data">{this.state.monthChangeP}%</div>
                    <div className="info">Change Since Last Month (%)</div>
                </div>
            </div>
        );
    }
    
}

export default Info;