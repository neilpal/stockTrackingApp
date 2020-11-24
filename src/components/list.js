import React, { useState, useEffect } from 'react';
import Row from './row.js';
import { stock } from '../resources/stockInfo.js';
import app from '../firebase';
import { useAuth } from '../contexts/AuthContext.js';
//ff3933
function List(){

    //set up a constructor
    //takes in props

    const [lastTradingDate, setLastTradingDate] = useState(null);
    const { currentUser } = useAuth()
    const [tickerList, setTicker] = useState();
    
    useEffect(() => {
        stock.getLastTradingDate().then((data) => {
            setLastTradingDate(data[0].date)
        })

        const ref = app.database().ref(`/users/${currentUser.uid}`)
        ref.on("value", (snapshot) => {
            const tickers = snapshot.val();
            const tickerList = [];
            for (let id in tickers) {
                tickerList.push(tickers[id]);
            }
            setTicker(tickerList)
        })
    }, [])

    return(
        <ul className="list-group list-group-flush">
            <div>{tickerList ? tickerList.map((tick, index) => <Row ticker={tick.ticker} lastTradingDate={lastTradingDate} key={index}/>) : ''}</div>
        </ul>
        
    )
    
}

export default List;