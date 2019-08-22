import React from 'react'
import SearchContainer from '../containers/SearchContainer'



class HomePage extends React.Component{
  constructor(){
    super()
    this.state = {
      allEvents: [],
      filteredEvents:[],
      searchTerm: '',
      select: 'select'
    }
  }
  componentDidMount(){
    fetch("http://localhost:3000/concerts")
    .then(response => response.json())
    .then(data =>{ console.log(data)
      this.setState({
        allEvents: data,
        filteredEvents: data
      })
    })
  }

  handleSearchTerm = (event) => {
    event.preventDefault()
    const filteredEventsClone = [...this.state.allEvents]
    const filteredList = filteredEventsClone.filter(eventClone => {
      return eventClone.name.includes(event.target.value)
    })
    this.setState({
      searchTerm: event.target.value,
      filteredEvents: filteredList
    })
  }
  handleSubmit = (event) => {
    event.preventDefault()

  }



  render(){
    return(
      <div class="ui search">
        <form>
           <h1>Search For Concerts:</h1>
            <input class="prompt" type="text" value={this.state.searchTerm} onChange={this.handleSearchTerm} />
          {this.state.filteredEvents.map(event => {
            return <SearchContainer city={this.state.city} artist={this.state.artist} event={event}/>
          })}
          </form>
     </div>
    )
  }
}
{/*  <form>
    <input type="text" value={this.state.searchTerm} onChange={this.handleSearchTerm} />
  {this.state.filteredEvents.map(event => {
    return <SearchContainer city={this.state.city} artist={this.state.artist} event={event}/>
  })}
  </form>*/}


export default HomePage;
