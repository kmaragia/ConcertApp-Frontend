import React from 'react'
import { Route, Redirect } from 'react-router'
import { Form } from 'semantic-ui-react'



class Login extends React.Component {

  constructor() {
    super()
    this.state = {
      nameValue: '',
      passwordValue:'',
      redirect: false,
    };
  }
  handleChangeName = (event) => {
    event.preventDefault();
    this.setState({
      nameValue: event.target.value,
    });
  }
  handleChangePassword = (event) => {
    event.preventDefault();
    this.setState({
      passwordValue: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/login",{
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
        username: this.state.nameValue,
        password: this.state.passwordValue
      })
    }).then(response => response.json())
    .then(data => {
    if (data.authenticated){
      this.props.updateCurrentUser(data.user)
      localStorage.setItem("jwt", data.token)
      localStorage.setItem("user_id", data.user.id)
    }
    else {
      alert("incorrect")
    }
  })
}

  handleCreateAccount = (event) => {
    event.preventDefault();
    this.setState({
      redirect:true
    })
  }

  render() {
    return (
      <div className='pos'>
        <div className="ui form">
            <form onSubmit={this.handleSubmit} className="form-box">
              <div className="three wide field" >
              <label className="user">Enter Username:</label>

                <input type="text" value={this.state.nameValue} onChange={this.handleChangeName} maxlength="9" size="9" />

              </div>

              <div className="three wide field" >
              <label className="user">Enter Password:</label>

                <input type="password" value={this.state.passwordValue} onChange={this.handleChangePassword} maxlength="15" size="15"/>

              </div>

              <input className="ui submit button" type="submit" value="Login" />
            </form>
            <br/>
            {this.state.redirect? <Redirect to="/create"/>:(
              <form onSubmit={this.handleCreateAccount}>
              <input className="ui submit button" type="submit" value="CreateAccount" />
              </form>
            )}
        </div>

      </div>
  )}
}

{/*  <div className="ui form">
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
    {this.state.redirect? <Redirect to="/create"/>:(
      <form onSubmit={this.handleCreateAccount}>
      <input className="ui submit button" type="submit" value="CreateAccount" />
      </form>
    )}
</div>*/}


export default Login;
