import React from 'react'
import SearchContainer from '../containers/SearchContainer'
import _ from 'lodash'


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
    // const filteredEventsClone = [...this.state.filteredEvents]
    // const filteredList = filteredEventsClone.filter(eventClone => {
    //   return eventClone.name.includes(event.target.value)
    // })
    this.setState({
      searchTerm: event.target.value,
      // filteredEvents: filteredList
    })
  }
  handleSelect = (event)=>{
    event.preventDefault()
    this.setState({
       select: event.target.value
    })


  }
  handleSubmit = (event) => {
    event.preventDefault()

  }



  render(){
    return(
      <div>
        <form >
          <select onChange={this.handleSelect}>
            <option value="select">select</option>
            <option value="artist">artist</option>
            <option value="city">city</option>
          </select>
          <input type="text" onChange={this.handleSearchTerm}/>
          <input type="submit" value="Submit"/>
        </form>
     </div>
    )
  }
}
{/*<form>
  <input type="text" value={this.state.searchTerm} onChange={this.handleSearchTerm} />
{this.state.filteredEvents.map(event => {
  return <SearchContainer city={this.state.city} artist={this.state.artist} event={event}/>
})}
</form>*/}

export default HomePage;
