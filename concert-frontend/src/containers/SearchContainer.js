import React from 'react'
import InfoContainer from './InfoContainer'
import { Route, Redirect,withRouter } from 'react-router'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import swal from 'sweetalert';




class SearchContainer extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      artist: [],
      currentImage:'',
      currentDate:'',
      status: '',
      pleaseNote: '',
      buyTicket:''
    }
  }

  handleSaveConcert = (event,id) => {
    event.preventDefault()
    let concertId = id
    let userId = localStorage.user_id
    fetch("http://localhost:3000/user_concerts", {
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user_id:userId,concert_id:concertId})
    }).then(response => response.json())
    .then(data => {
    console.log(data)

  })
  swal({
     text: "Concert Saved!",
     icon: "success",
     button: "Ok",
   });
  }

  handleMoreInfo = (event) => {
    event.preventDefault()
    console.log(event.target.id)
    var proxyUrl ='https://cors-anywhere.herokuapp.com/',
     targetUrl =`https://app.ticketmaster.com/discovery/v2/events/${event.target.id}.json?classificationName=music&size=199&apikey=QJ4IrvJapC374P6xAHNOhamTTtYTleY9`
    fetch(proxyUrl + targetUrl)
    .then(response => response.json())
    .then(data =>{
      console.log(data.url)
      this.setState({
        artist: data,
        currentImage: data.images[2].url,
        currentDate: data.dates.start.localDate,
        status: data.dates.status.code,
        pleaseNote: data.pleaseNote,
        buyTicket: data.url

    })
  }
  )
  }

  render(){
    return(
      <div className="ui celled grid" >
        <div className="row">
          <div id ="one" className="three wide column">
            <img src={this.props.event.img}/>
          </div>
          <div id ="two" className="eight wide column">
            <h1>{this.props.event.name}</h1>
          </div>
        </div>
        <div className="row">
          <div id ="three" className="three wide column">
            <button onClick ={(event) => this.handleSaveConcert(event,this.props.event.id)}>Save Concert</button>
          </div>
          <div id ="four" className="five wide column">
            <p>{this.props.event.location}</p>
            <p>{this.props.event.address}</p>
              {this.props.event.date?
                <p>Date: {this.props.event.date.substr(0,10)}</p>: null}
            <p>{this.props.event.time}</p>
          </div>

          <div id="five" className="three wide column">
          <Modal trigger={<Button className='btn'id={this.props.event.artist_id} onClick={this.handleMoreInfo}>More Info</Button>}>
            <Modal.Header>{this.state.artist.name}</Modal.Header>
            <Modal.Content>
              <Image wrapped size='medium' src={this.state.currentImage} />
              <Modal.Description>
                <Header>Event Info</Header>
                <h3>Date</h3>
                <p>{this.state.currentDate}</p>
                <h3>Status:</h3>
                <p>{this.state.status.toUpperCase()}</p>
                <h3>Buy Ticket:</h3>
                <a>{this.state.buyTicket}</a>
                <h3>ATTENTION:</h3>
                <p>{this.state.pleaseNote}</p>
              </Modal.Description>
            </Modal.Content>
          </Modal>

         </div>

    </div>
  </div>
    )
  }
}


export default withRouter(SearchContainer);
