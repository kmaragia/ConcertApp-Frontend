import React from 'react'
import EditPage from './EditPage'
import ConcertContainer from '../containers/ConcertContainer'



class UserPage extends React.Component{

  constructor(props){
    super(props)
    this.state = {
       showForm: false,
       allSaved: []
    }
  }

  componentDidMount() {
    console.log("hey")
    fetch(`http://localhost:3000/users/${this.props.user.id}`)
    .then(response => response.json())
    .then(data => {
    this.setState({
      allSaved:data.concerts
    })
  })
  }
  handleEdit = () => {
      this.setState({
        showForm:true
      })
  }
  handleCancel = () => {
      this.setState({
        showForm:false
      })
  }
  // handleDelete = () => {
  //   fetch(`http://localhost:3000/users/${this.props.user.id}`,{
  //        method:'DELETE',
  //        headers:{'Content-Type':'application/json'},
  //        body:JSON.stringify({
  //            id:this.props.user.id
  //        })
  //    }).then(response => response.json())
  //    .then(data => console.log(data))
  // }



  render(){


    return(
      <div className="user-box">
       <div className="ui card">
          <div className="image">
            <img src='https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=Gray01&eyeType=Cry&eyebrowType=Default&mouthType=Smile&skinColor=Black'
/>
          </div>
          <div className="content">
            <div className="header">{this.props.user.first_name} {this.props.user.last_name}</div>
            <div className="meta">
              <span className="date">Joined in 2019</span>
            </div>
            <div className="description">
              Username : {this.props.user.username}
              <br/>
              Email Address: {this.props.user.email}
              <br/>
            </div>
          </div>
          <div>
            <div className="extra content">
              <button onClick={this.handleEdit} className="ui inverted green button">Edit Details</button>
              <button onClick={this.handleCancel} className="ui inverted green button">Hide Details</button>
              <br/>
            </div>
            <br/>
           {this.state.showForm?
           <EditPage userName={this.props.user.username} email={this.props.user.email} phoneNumber={this.props.user.Phone_number} id ={this.props.user.id} password={this.props.user.password}/>
          :null}
        </div>
      </div>
        <br/>
         <div className='concert-cards'>
           {this.state.allSaved?
             this.state.allSaved.map(concert => {
               return (<ConcertContainer concert={concert}/>)
             })
           : null}

         </div>
     </div>


    )
  }

}



export default UserPage;
