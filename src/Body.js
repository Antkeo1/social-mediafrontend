import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import AllProfiles from './AllProfiles'
import {handleView, handleUpdate} from './auth/api'
import {handleDelete} from './auth/api'

class Body extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profiles: []

    }
  }
  // to edit
  handleUpdate = (profile) => {
    fetch('http://localhost:4741/update-profile/:id',
      {
        method: 'PUT',
        body: JSON.stringify({profile: profile}),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
      this.updateProfile(profile)
    })
  }
  updateProfile= (profile) => {
    const newProfiles = this.state.profiles.filter((p) => p.id !== profile.id)
    newProfiles.push(profile)
    this.setState({
      profiles: newProfiles
    })
  }

  // to delete
  handleDelete = (id, user) => {
    fetch('http://localhost:4741/delete-profile/:id',
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':`Token token=${user.token}`
        }
      }).then((response) => {
      this.deleteProfile(id)
    })
  }
  // delete method
  deleteProfile = (id) => {
    const newProfiles = this.state.profiles.filter((profile) => profile.id !== id)
    this.setState({
      profiles: newProfiles
    })
  }



  componentDidMount(){
    fetch('http://localhost:4741/show-all-profiles')
      .then((response) => {return response.json()})
      .then((data) => {this.setState({ profiles: data.profiles}) })
  }
  render(){
    return(
      <div>
        <AllProfiles profiles={this.state.profiles} user={this.props.user} handleUpdate={this.handleUpdate} handleView={handleView}
          handleDelete={this.handleDelete} />
      </div>
    )
  }
}

export default Body
