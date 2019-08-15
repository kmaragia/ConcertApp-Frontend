import React from 'react'
import InfoContainer from './InfoContainer'
import { Route, Redirect } from 'react-router'



class SearchContainer extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      artist: {},
      redirect: false
    }
  }

  handleSaveConcert = () => {

  }


  handleMoreInfo = (event) => {
    event.preventDefault()
    console.log(event.target.id)
    fetch(`https://app.ticketmaster.com/discovery/v2/events${event.target.id}.json?classificationName=music&size=199&apikey=QJ4IrvJapC374P6xAHNOhamTTtYTleY9`)
    .then(response => response.json())
    .then(data =>{
      this.setState({
        artist: data
    })
  }
  )
  }

  render(){
    return(
      <div className="ui celled grid" >
        <div className="row">
          <div className="three wide column">
            <img src={this.props.event.img}/>
          </div>
          <div className="eight wide column">
            <h1>{this.props.event.name}</h1>
          </div>
        </div>
        <div className="row">
          <div className="three wide column">
            <button>Save Concert</button>
          </div>
          <div className="five wide column">
            <p>{this.props.event.location}</p>
            <p>{this.props.event.address}</p>
            <p>{this.props.event.date}</p>
            <p>{this.props.event.time}</p>
          </div>
          {/*{this.state.redirect? <Redirect to="/info"/>:(*/}
          <div className="three wide column">
            <button id={this.props.event.artist_id}     onClick={this.handleMoreInfo}>More Info</button>
            {/*<InfoContainer artist={this.state.artist}/>*/}
          </div>

        </div>
      </div>
    )
  }
}


export default SearchContainer;
