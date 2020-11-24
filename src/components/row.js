import React, { Component } from 'react';
import app from '../firebase.js';
import { stock } from '../resources/stockInfo.js';
import { uid } from './App.js';

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
        
        const formattedPrice = (data.price === null) ? null : data.price.toFixed(2)
        
        this.setState({
            price: formattedPrice,
            date: data.date,
            time: data.time
        });
        
        
    }

    componentDidMount() {
        stock.latestPrice(this.props.ticker, this.applyData.bind(this))
        
    }
    
    componentDidUpdate(prevProps) {
        if (prevProps.lastTradingDate !== null){
            
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

    

    async handleDelete(e){

        e.preventDefault()
        
        const ref = app.database().ref(`/users/${uid}`)
        ref.once("value", (snapshot) => {
            const tickers = snapshot.val();
            console.log(snapshot.val());
            for (let id in tickers) {
                if (tickers[id].ticker == e.target.value){
                    console.log(id);
                    ref.child(`/${id}`).remove();
                };
            }
            
        });


    };

   

    

    render(){
        return(
            <li className="list-group-item" style={{backgroundColor: "black", color: "silver"}}>
                <b>{this.props.ticker}</b> ${this.state.price}
                <span className="change" style={this.changeStyle()}>
                {this.state.dollar_change}
                &nbsp;
                {this.state.percent_change}
                </span>
                
                <button value={this.props.ticker} className="btn btn-warning btn-sm float-right" onClick={this.handleDelete}>Delete</button>
            </li>
        
        )
    }
}

export default Row;