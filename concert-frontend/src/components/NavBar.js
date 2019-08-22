import React from 'react'
import { Route, Redirect, withRouter } from 'react-router'

class NavBar extends React.Component{

  logOut = ()=> {
    localStorage.clear()
    this.props.updateCurrentUser(null)
  }
  goSearch = ()=> {

    this.props.history.push("/home")
  }
  goHome = () => {
    this.props.history.push("/mypage")

  }
  render(){
    return(
      <div>
      {this.props.loggedIn? (
      <div className="ui three item menu">

        <div onClick={this.goHome} className="active item">My Page</div>
        <div onClick={this.goSearch} className="item">Search for Concerts</div>
        <div onClick={this.logOut} className="item">Log Out</div>
      </div>
    ):
     <div className="ui one item menu">
      <h1 className="item">Easy Concert</h1>
    </div>}
      </div>

    )
  }
}


export default withRouter(NavBar);
