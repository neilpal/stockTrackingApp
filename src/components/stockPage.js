import React from 'react';
import List from './list.js';
import { Card } from 'react-bootstrap'

const StockPage = () => {
    return(
        <div className="App">
    
            <div className="container">
                <div className="col-md-5 mt-5">
                    <div className="card">
                        <ul className="list-group list-group-flush">
                            <List />
                        </ul>
                    </div>
                </div>

            </div>
        </div>
       
    )
}

export default StockPage;