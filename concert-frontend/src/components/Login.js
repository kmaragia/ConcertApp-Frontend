import React from 'react'
import { Route, Redirect } from 'react-router'



class Login extends React.Component {

  constructor() {
    super()
    this.state = {
      nameValue: '',
      passwordValue:'',
      redirect: false,
      redirect2: false
    };
  }
  handleChangeName = (event) => {
    this.setState({
      nameValue: event.target.value,
    });
  }
  handleChangePassword = (event) => {
    this.setState({
      passwordValue: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      redirect:true
    })
  }
  handleCreateAccount = (event) => {
    event.preventDefault();
    this.setState({
      redirect2:true
    })
  }

  render() {
    return (
      <div>
      {this.state.redirect? <Redirect to="/home"/>:(
      <div className="ui form">
        <form onSubmit={this.handleSubmit} className="form-box">
          <div className="field" >
          <label className="user">Enter Username:</label>

            <input type="text" value={this.state.nameValue} onChange={this.handleChangeName} />

          </div>

          <div className="field" >
          <label className="user">Enter Password:</label>

            <input type="password" value={this.state.passwordValue} onChange={this.handleChangePassword} />

          </div>

          <input className="ui submit button" type="submit" value="Login" />
        </form>
        <br/>
        {this.state.redirect2? <Redirect to="/create"/>:(
          <form onSubmit={this.handleCreateAccount}>
          <input className="ui submit button" type="submit" value="CreateAccount" />
          </form>
        )}
    </div>
  )}
  </div>
    );
  }
}




export default Login;
