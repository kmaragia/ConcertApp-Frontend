import React from 'react'
import { Route, Redirect, withRouter } from 'react-router'


class EditPage extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      email:'',
      phoneNumber:''
    };
  }


    userName = (event) => {
      this.setState({
        userName: event.target.value
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
    goBack = () => {
      this.props.history.push("/mypage")
    }

  handleUpdate = (event) => {
    event.preventDefault()
    let body = JSON.stringify({user: {username: this.state.userName, password: this.props.password, Phone_number:this.state.phoneNumber, email:this.state.email} })
    fetch(`http://localhost:3000/users/${this.props.id}`, {
      method:"PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    }).then(response => response.json())
    .then(data => {
      console.log(data);
      // this.props.history.push("/mypage")

    })

  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleUpdate} className="ui form segment">
           <p>Let's go ahead and edit your account</p>
           <div className="field">
             <label>Username</label>
             <input value={this.state.userName} onChange={this.userName}placeholder="Username" name="userName" type="text"/>
           </div>
           <div className="field">
             <label>Email</label>
             <input value={this.state.email} onChange={this.email}type="email" placeholder="Email" name="email"/>
           </div>
           <div className="field">
             <label>Phone Number</label>
             <input value={this.state.phoneNumber} onChange={this.phoneNumber} placeholder="Phone Number" type="tel" name="phone number"/>
           </div>

           <button className="ui primary submit button">Update</button>
           <div className="ui error message"></div>
         </form>


     </div>

    )
  }
}


export default withRouter(EditPage);
