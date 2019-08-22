import React from 'react'



class ConcertContainer extends React.Component{

  constructor(props){
    super(props)

    this.state = {
      buyTicket:''
    }
  }
    handleDelete = () => {
      let concert_id = this.props.concert.id
      fetch(`http://localhost:3000/concerts/${this.props.concert.id}`,{
      method:'DELETE'
      })
    }
    componentDidMount(){
      var proxyUrl ='https://cors-anywhere.herokuapp.com/',
       targetUrl =`https://app.ticketmaster.com/discovery/v2/events/${this.props.concert.artist_id}.json?classificationName=music&size=199&apikey=QJ4IrvJapC374P6xAHNOhamTTtYTleY9`
      fetch(proxyUrl + targetUrl)
      .then(response => response.json())
      .then(data =>{
        this.setState({
          buyTicket: data.url
      })
    }
    )
    }

  render (){
    return(
          <div className="ui card card-box ">
            <div className="content">
              <div className="header">Concert</div>
            </div>
            <div className="content">
              <h4 className="ui sub header">Activity</h4>
              <div className="ui small feed">
                <div className="event">
                  <div className="content">
                    <div className="summary">
                       <img src={this.props.concert.img}/>
                    </div>
                  </div>
                </div>
                <div className="event">
                  <div className="content">
                    <div className="summary">
                      <div>{this.props.concert.name}</div>
                    </div>
                  </div>
                </div>
                <div className="event">
                  <div className="content">
                    <div className="summary">
                       <p>Location: {this.props.concert.location}</p>
                       {this.props.concert.date?
                         <p>Date: {this.props.concert.date.substr(0,10)}</p>: null}
                       <p>Time:{this.props.concert.time}</p>
                   </div>
                 </div>
                  </div>
                </div>
              </div>
              <div className="extra content">
                <a id ={this.props.concert.artist_id} href={this.state.buyTicket} className="ui button">Buy Ticket</a>
                <button onClick={this.handleDelete} className="ui button">Delete</button>
              </div>
            </div>

    )
  }
}

export default ConcertContainer;
