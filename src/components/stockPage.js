import React, { useState } from 'react';
import List from './list.js';
import TickerForm from './TickerForm'
import { useHistory } from "react-router-dom"
import { useAuth } from '../contexts/AuthContext'

const StockPage = () => {

    const [error, setError] = useState("")
    const { logout, currentUser } = useAuth()
    const history = useHistory()


    async function handleLogout() {
        setError('')
    
        try{
          await logout()
          history.push("/login")
        }catch {
          setError('Failed to log out')
        }
    }

    return(
        <div className="App">
            <span className="d-flex justify-content-center">{currentUser.email}</span>
            <div className="d-flex justify-content-center">
                <input className="btn btn-primary" type="submit" value="Log Out" onClick={handleLogout}></input>
            </div>
            <div className="container">
                <div className="col-md-12 mt-4">
                    <div className="card">
                        <ul className="list-group list-group-flush">
                            <List />
                        </ul>
                        
                    </div>
                    <TickerForm />
                </div>

            </div>
            


        </div>
       
    )
}

export default StockPage;