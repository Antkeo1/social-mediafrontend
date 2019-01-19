import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

class AllProfiles extends Component {
  constructor(props) {
    super(props)
    this.state = [{
      profiles: {
        name:'',
        occupation:'',
        gender:'',
        race:'',
        interest:'',
        hobbies:''

      }
    }]
  }

  render(){
    return(
      <div>
        <h1>To do: List of profiles</h1>
      </div>
    )
  }
}

export default AllProfiles
