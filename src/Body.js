import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import AllProfiles from './AllProfiles'

class Body extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profiles: []
    }
  }
  componentDidMount(){
    fetch('http://localhost:4741/show-all-profiles')
      .then((response) => {return response.json()})
      .then((data) => {this.setState({ profiles: data.profiles}) })
  }
  render(){
    return(
      <div>
        <AllProfiles profiles={this.state.profiles} />
      </div>
    )
  }
}

export default Body
