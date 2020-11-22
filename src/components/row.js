import React, { Component } from 'react';
import { iex } from '../utilities/iexToken.js';
import { stock } from '../resources/stockInfo.js';



class Row extends Component{

    //set up a constructor
    //takes in props

    constructor(props) {
        super(props)
        this.state = {
            price: null,
            date: null,
            time: null,
            dollar_change: null,
            percent_change: null

            

        }
    }

    changeStyle() {
    
        return {
            color: (this.state.dollar_change > 0) ? '#33ff3f' : '#f03731',
            fontSize: '0.8rem',
            marginLeft: 5
        }
    }

    applyData(data) {

        const formattedPrice = (data.price === undefined) ? null : data.price.toFixed(2)
        
        this.setState({
            price: data.price,
            date: data.date,
            time: data.time
        });
        
        
    }

    componentDidMount() {
        stock.latestPrice(this.props.ticker, this.applyData.bind(this))
        

       
    }

    componentDidUpdate(prevProps) {
        if (prevProps.lastTradingDate == null){
            stock.getYesterdaysClose(this.props.ticker, this.props.lastTradingDate, (yesterday) => {
                const dollar_change = (this.state.price - yesterday.price).toFixed(2)
                const percent_change = (100*dollar_change / yesterday.price).toFixed(2)
                this.setState({
                    dollar_change: `${dollar_change}`,
                    percent_change: `  (${percent_change}%)`
                })
            })
        }
        
    }

    render(){
        return(
            <li className="list-group-item" style={{backgroundColor: "black", color: "silver"}}>
                <b>{this.props.ticker}</b> ${this.state.price}
                <span className="change" style={this.changeStyle()}>
                  {this.state.dollar_change}
                  &nbsp;
                  {this.state.percent_change}
                </span>
            </li>
            
        )
    }
}

export default Row;