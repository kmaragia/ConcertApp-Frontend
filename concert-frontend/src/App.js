import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import CreateAccount from './components/CreateAccount'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './components/HomePage'
import UserPage from './components/UserPage'
import NavBar from './components/NavBar'
import InfoContainer from './containers/InfoContainer'

class App extends React.Component{

  render(){
    return(
       <div>
         <NavBar/>
         <Router>
            <React.Fragment>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/create" component={CreateAccount}/>
              <Route exact path="/home" component={HomePage}/>
              <Route exact path="/mypage" component={UserPage}/>
              <Route exact path="/info" component ={InfoContainer}/>
            </React.Fragment>
         </Router>
       </div>
    )
  }
}

export default App;
