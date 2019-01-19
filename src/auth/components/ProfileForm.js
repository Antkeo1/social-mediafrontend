import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import messages from '../messages'
import apiUrl from '../../apiConfig'
import { handleErrors, profileForm } from '../api'

class ProfileForm extends Component {
  constructor () {
    super()

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

  profileForm = event => {
    event.preventDefault()

    const { profile: {name, occupation, gender, race, interest, hobbies}} = this.state
    const { flash, history, user } = this.props

    profileForm(this.state, user)
      .then(handleErrors)
      .then(handleErrors)
      .then(res => res.json())
      .then(() => flash(messages.profileFormSuccess, 'flash-success'))
      .then(() => history.push('/'))
      .catch(() => flash(messages.profileFormFailure, 'flash-error'))
  }

  render () {
    const { name, occupation, gender, race, interest, hobbies} = this.state

    return (
      <form className='auth-form' onSubmit={this.profileForm}>
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

export default withRouter(ProfileForm)
