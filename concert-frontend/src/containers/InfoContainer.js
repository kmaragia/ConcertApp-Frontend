import React from 'react'


class InfoContainer extends React.Component{

  handleMoreInfo = (event) => {
    event.preventDefault()
    console.log(event.target.id)
    var proxyUrl ='https://cors-anywhere.herokuapp.com/',
     targetUrl =`https://app.ticketmaster.com/discovery/v2/events/${event.target.id}.json?classificationName=music&size=199&apikey=QJ4IrvJapC374P6xAHNOhamTTtYTleY9`
    fetch(proxyUrl + targetUrl)
    .then(response => response.json())
    .then(data =>{
      console.log(data)
      this.setState({
        artist: data,
        redirect:true
    })
  }
  )
  }

  render(){
    return(
      <div>
        <p></p>
      </div>
    )
  }
}

export default InfoContainer;
