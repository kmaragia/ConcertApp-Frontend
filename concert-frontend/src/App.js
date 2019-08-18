import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import CreateAccount from './components/CreateAccount'
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import HomePage from './components/HomePage'
import UserPage from './components/UserPage'
import NavBar from './components/NavBar'
import InfoContainer from './containers/InfoContainer'

class App extends React.Component{
  constructor(){
    super()
    this.state = {
      user: null
    }
  }

  updateCurrentUser = (user) => {
    this.setState({
      user: user
    })
  }

  componentDidMount(){
    let token = localStorage.getItem("jwt")
    if (token){
      fetch("http://localhost:3000/profile",{
        headers:{"Authentication": `Bearer ${token}`}
      })
      .then(response => response.json())
      .then(user => {
         this.updateCurrentUser(user)
    })
    }

  }

  render(){
    return(
       <div>
         <React.Fragment>
         <NavBar loggedIn={this.state.user} updateCurrentUser={this.updateCurrentUser}/>
         <Router>

              <Route exact path="/" render={() => {
                return <Redirect to ="/mypage" />
                }}/>

              <Route exact path="/mypage" render={() => {
                  return (this.state.user?
                    <UserPage user={this.state.user}/>
                    :<Redirect to="/login"/>)
                }}/>

              <Route exact path="/login" render={() => {
                  return( this.state.user === null?
                  <Login updateCurrentUser={this.updateCurrentUser}/>:
                    <Redirect to ="/mypage" />)
                }}/>

              <Route exact path="/create" component={CreateAccount}/>

         </Router>
         </React.Fragment>
       </div>
    )
  }
}

export default App;
