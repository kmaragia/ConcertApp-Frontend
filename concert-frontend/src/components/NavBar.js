import React from 'react'

class NavBar extends React.Component{

  logOut = (event)=> {
    event.preventDefault()
    localStorage.removeItem("jwt")
    this.props.updateCurrentUser(null)
  }
  render(){
    return(
      <div>
        <button onClick={this.logOut}>logout</button>

      </div>
    )
  }
}


export default NavBar;
