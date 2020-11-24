import React from 'react';
import StockPage from './stockPage'
import Signup from './Signup'
import { Container } from 'react-bootstrap'
import { AuthProvider } from '../contexts/AuthContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import { auth } from '../firebase'
export { uid }

var uid;

function App() {

  auth.onAuthStateChanged(function(user) {
    if(user) uid = user.uid;
  })

  return(
      
      <Container className="d-flex align-item-center justify-content-center" style={{minHeight: "100vh"}}>
        <div></div>
        <div className="w-100 mt-4" style={{maxWidth: "400px"}}>
          <Router>
            <AuthProvider>
              <Switch>
                <PrivateRoute exact path='/' component={StockPage} />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                
              </Switch>
            </AuthProvider>
          </Router>
        </div>
        
      </Container>
      
  )
}

export default App;