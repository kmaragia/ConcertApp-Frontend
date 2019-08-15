import React from 'react'


class InfoContainer extends React.Component{

  render(){
    return(
      <div>
        <p>{this.props.artist.name}</p>
      </div>
    )
  }
}

export default InfoContainer;
