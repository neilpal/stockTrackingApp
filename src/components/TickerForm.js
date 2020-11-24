import React, { useState } from 'react'
import "firebase/database"
import { useAuth } from "../contexts/AuthContext"
import app from '../firebase'

function TickerForm() {

  const [value, setValue] = useState('')
  const { currentUser } = useAuth()

    
  
  function handleChange(event) {
      setValue(event.target.value);
      
    }
  
  async function handleSubmit(event) {
    
    app.database().ref(`/users/${currentUser.uid}`).push({
      ticker: value
    });

    event.preventDefault()
  }
  
  return (
    <form onSubmit={handleSubmit}>
        
        <div className="form-group">
            <span></span>
        </div>
        
        <div className="form-group">
            <label>
                Add A Stock Ticker:
                <input className="form-control" type="text" value={value} onChange={handleChange} />
            </label>
            
        </div>
        <div className="form-group">
            <input className="btn btn-primary" type="submit" value="Add" />
        </div>
    </form>
  );
    
}


export default TickerForm