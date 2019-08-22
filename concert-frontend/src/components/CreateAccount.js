import React from 'react'
import { Route, Redirect, withRouter } from 'react-router'



class CreateAccount extends React.Component{

  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName:'',
      userName: '',
      password:'',
      email:'',
      phoneNumber:''
    };
  }

  firstName = (event) => {
    this.setState({
      firstName: event.target.value,
    });
  }
  lastName = (event) => {
    this.setState({
      lastName: event.target.value,
    });
  }
  userName = (event) => {
    this.setState({
      userName: event.target.value,
    });
  }
  password = (event) => {
    this.setState({
      password: event.target.value
    });
  }
  email = (event) => {
    this.setState({
      email: event.target.value
    });
  }
  phoneNumber = (event) => {
    this.setState({
      phoneNumber: event.target.value
    });
  }
  handleGoBack = () => {
    this.props.history.push("/login")
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("pressed")
    let body = JSON.stringify({user:{first_name:this.state.firstName,last_name:this.state.lastName, username: this.state.userName, password:this.state.password, phone_number:this.state.phoneNumber, email:this.state.email} })

    fetch("http://localhost:3000/users", {
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    }).then(response => response.json())
    .then(data => {
    console.log(data)
    this.props.history.push("/login")

  })
  }



  render(){
    return(

         <div>
           <form onSubmit={this.handleSubmit} className="ui form segment">
              <p>Let's go ahead and get you signed up.</p>
              <div className="two fields">
                <div className="field">
                  <label>First Name</label>
                  <input value={this.state.firstName} onChange={this.firstName} maxlength="10" placeholder="First Name" name="first-name" type="text" required/>
                </div>
                <div className="field">
                  <label>Last Name</label>
                  <input value={this.state.lastName} onChange={this.lastName}maxlength="10" placeholder="Last Name" name="last-name" type="text" required/>
                </div>
              </div>
              <div className="field">
                <label>Username</label>
                <input value={this.state.userName} onChange={this.userName}maxlength="9"placeholder="Username" name="userName" type="text" required/>
              </div>
              <div className="field">
                <label>Email</label>
                <input value={this.state.email} onChange={this.email}type="email" placeholder="Email" name="email" required/>
              </div>
              <div className="field">
                <label>Phone Number (format: xxx-xxx-xxxx)</label>
                <input value={this.state.phoneNumber} onChange={this.phoneNumber} placeholder="Phone Number" type="tel" name="phone number" pattern="^\d{3}-\d{3}-\d{4}$" maxlength="12" size="12"required/>
              </div>
              <div className="field">
                <label>Password</label>
                <input value={this.state.password} onChange={this.password}type="password" name="password" minlength="8" maxlength="15"required/>
              </div>
              <div className="inline field">
                <div className="ui checkbox">
                  <input type="checkbox" name="terms" required/>
                  <label>I agree to the Terms and Conditions</label>
                </div>
              </div>
                <button className="ui primary submit button">Create Account</button>
              <div className="ui error message"></div>
            </form>
            <button onClick={this.handleGoBack} className="ui inverted blue button">Back</button>

        </div>

  )
  }
}


export default withRouter(CreateAccount);
