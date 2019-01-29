import React, { Component } from 'react'
import {createProfile, handleErrors} from '../api'
import messages from '../messages'

class ProfileCreate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      profile: [{
        name: '',
        occupation: '',
        gender: '',
        race:'',
        interest:'',
        hobbies:''
      }]

    }

  }
  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })
  // to make api call for POST
  onProfileCreate = event => {
    event.preventDefault()

    const { profile: {name, occupation, gender, race, interest, hobbies}} = this.state
    const { flash, history, user } = this.props

    createProfile(this.state, user)
      .then(handleErrors)
      .then(handleErrors)
      .then(res => res.json())
      .then(() => flash(messages.profileFormSuccess, 'flash-success'))
      .then(() => history.push('/'))
      .catch(() => flash(messages.profileFormFailure, 'flash-error'))
  }

  createProfile = (profile, user) => {
    return fetch(apiUrl + '/create-profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Token token=${user.token}`
      },
      body: JSON.stringify({
        profile: {
          name:profile.name,
          occupation:profile.occupation,
          gender:profile.gender,
          race:profile.race,
          interest:profile.interest,
          hobbies:profile.hobbies
        }
      })
    })
  }

  render(){
    const { profile: {name, occupation, gender, race, interest, hobbies}} = this.state
    return(

      <form className='auth-form' onSubmit={this.onProfileCreate}>
        <h3>Create Profile</h3>

        <label htmlFor="name">Name</label>
        <input
          required
          name="name"
          value={name}
          type="text"
          placeholder="name"
          onChange={this.handleChange}
        />
        <label htmlFor="occupation">Occupation</label>
        <input
          required
          name="occupation"
          value={occupation}
          type="text"
          placeholder="Occupation"
          onChange={this.handleChange}
        />
        <label htmlFor="gender">Gender</label>
        <input
          required
          name="gender"
          value={gender}
          type="text"
          placeholder="Gender Identity"
          onChange={this.handleChange}
        />
        <label htmlFor="race">Race</label>
        <input
          required
          name="race"
          value={race}
          type="text"
          placeholder="Race"
          onChange={this.handleChange}
        />
        <label htmlFor="interest">Interest</label>
        <input
          required
          name="interest"
          value={interest}
          type="text"
          placeholder="What are your interest"
          onChange={this.handleChange}
        />
        <label htmlFor="hobbies">Hobbies</label>
        <input
          required
          name="hobbies"
          value={hobbies}
          type="text"
          placeholder="Hobbies"
          onChange={this.handleChange}
        />
        <button type="submit">Create Profile</button>
      </form>

    )
  }
}

export default ProfileCreate
