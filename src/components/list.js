import React, { Component } from 'react';
import Row from './row.js';
import { stock } from '../resources/stockInfo.js';
//ff3933


class List extends Component{

    //set up a constructor
    //takes in props

    constructor(props) {
        super(props)
        this.state = {
            lastTradingDate: null


        }
    }

    componentDidMount() {
        stock.getLastTradingDate().then((data) => {
            this.setState({
                lastTradingDate: data[0].date
            })
        })
    }

    render(){
        const lastTradingDate = this.state.lastTradingDate;


        return(
            <ul className="list-group list-group-flush">
              <Row ticker="AAPL" lastTradingDate={this.state.lastTradingDate} />
              <Row ticker="MSFT" lastTradingDate={this.state.lastTradingDate} />
              <Row ticker="BILL" lastTradingDate={this.state.lastTradingDate} />
              <Row ticker="TSLA" lastTradingDate={this.state.lastTradingDate} />
              <Row ticker="GOOG" lastTradingDate={this.state.lastTradingDate} />
              <Row ticker="SWK" lastTradingDate={this.state.lastTradingDate} />
              <Row ticker="GPRO" lastTradingDate={this.state.lastTradingDate} />
              <Row ticker="BABA" lastTradingDate={this.state.lastTradingDate} />
            </ul>
            
        )
    }
}

export default List;