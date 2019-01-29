import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import messages from '../messages'
import apiUrl from '../../apiConfig'
import { handleErrors, createProfile, handleUpdate} from '../api'

class ProfileForm extends Component {
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
    // if (this.props.profileCrud === 'create') {
    //   this.state.profileCrud = 'create'
    // }
  }
  // handleChanges is use to update the state based on value
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

  // to make api call for POST
  onProfileUpdate = event => {
    event.preventDefault()

    const { profile: {name, occupation, gender, race, interest, hobbies}} = this.state
    const { flash, history, user } = this.props

    handleUpdate(this.state, user)
      .then(handleErrors)

      .then(res => res.json())
      .then(() => flash(messages.profileFormSuccess, 'flash-success'))
      .then(() => history.push('/'))
      .catch(() => flash(messages.profileFormFailure, 'flash-error'))
  }


  render () {
    {/* this defines what the state is */}
    const { name, occupation, gender, race, interest, hobbies} = this.state

    let profileView

    if (this.props.editable && this.props.deleteable){
      profileView =
      <div>
        <h3>{this.props.profile.name}</h3>
        <p>{this.props.profile.occupation}</p>
        <p>{this.props.profile.gender}</p>
        <p>{this.props.profile.race}</p>
        <p>{this.props.profile.interest}</p>
        <p>{this.props.profile.hobbies}</p>
        <button>View</button>
        <button>Delete</button>
        <button>Edit</button>
      </div>
    } else {
      profileView =
        <div>
          <h3>{this.props.profile.name}</h3>
          <p>{this.props.profile.occupation}</p>
          <p>{this.props.profile.gender}</p>
          <p>{this.props.profile.race}</p>
          <p>{this.props.profile.interest}</p>
          <p>{this.props.profile.hobbies}</p>
          <button>View</button>
        </div>
    }

    <form className='auth-form' onSubmit={this.props.profileCrud === 'create' ? this.onProfileCreate : this.onProfileUpdate}>
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

    {/* returns my form */}

    return (
      <div>{profileView}</div>
    )
  }
}

export default withRouter(ProfileForm)
