import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import CreateAccount from './components/CreateAccount'
import { BrowserRouter as Router, Route, Redirect,withRouter,Switch} from 'react-router-dom';
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
         <NavBar loggedIn={this.state.user} updateCurrentUser={this.updateCurrentUser}/>
         <React.Fragment>

         <Switch>
              <Route exact path="/home" render={() =>{
                  return this.state.user === null?
                    <Redirect to="/login"/>:
                      <HomePage />}}/>
              <Route exact path="/" render={() => {
                return <Redirect to ="/mypage" />
                }}/>

              <Route exact path="/mypage" render={() => {
                  return (this.state.user ?
                    <UserPage myConcerts={this.state.allSaved} user={this.state.user}/>
                    :<Redirect to="/login"/>)
                }}/>

              <Route exact path="/login" render={() => {
                  return( this.state.user === null?
                  <Login updateCurrentUser={this.updateCurrentUser}/>:
                    <Redirect to ="/mypage" />)
                }}/>

              <Route exact path="/create" component={CreateAccount}/>

         </Switch>
         </React.Fragment>
       </div>
    )
  }
}

export default withRouter(App);
