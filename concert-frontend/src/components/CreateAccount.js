import React from 'react'
import { Route, Redirect } from 'react-router'



class CreateAccount extends React.Component{

  constructor() {
    super()
    this.state = {
      nameValue: '',
      passwordValue:'',
      passwordValue2:'',
      emailValue: '',
      phoneNumber:'',
      dob:'',
      redirect: false
    };
  }


  handleChangeName = (event) => {
    this.setState({
      nameValue: event.target.value,
    });
  }
  handleChangeEmail = (event) => {
    this.setState({
      emailValue: event.target.value,
    });
  }
  handleChangePhone = (event) => {
    this.setState({
      phoneNumber: event.target.value,
    });
  }
  handleChangePassword = (event) => {
    this.setState({
      passwordValue: event.target.value
    });
  }
  handleChangePassword2 = (event) => {
    this.setState({
      passwordValue2: event.target.value
    });
  }


  handleSubmit = (event) => {
    event.preventDefault();
    let body = JSON.stringify({user: {username: this.state.name, password:this.state.passwordValue, Phone_number:this.state.phoneNumber, email:this.state.emailValue} })
    fetch("http://localhost:3000/users", {
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    }).then(response => response.json())
    this.setState({
      redirect:true
    })
  }



  render(){
    return(
         <div>
           {this.state.redirect? <Redirect to="/login"/>:(
          <form onSubmit={this.handleSubmit}>
              <label>Enter username:</label>
              <input type="text" value={this.state.nameValue} onChange={this.handleChangeName} />


              <label>Enter Email Address:</label>
              <input type="email" value={this.state.emailValue} onChange={this.handleChangeEmail}/>


              <label>Enter Phone Number:</label>
              <input type="tel"value={this.state.phoneNumber} onChange={this.handleChangePhone}/>


              <label>Enter Password:</label>
              <input type="password"value={this.state.passwordValue} onChange={this.handleChangePassword}/>

              <input type="submit" value="Create Account" />
          </form>
        )}
        </div>

  )
  }
}



export default CreateAccount;
