import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import messages from '../messages'
import apiUrl from '../../apiConfig'
import { handleErrors, updateProfile, handleUpdate, handleDelete} from '../api'
import { Link } from 'react-router-dom'

class ProfileForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      profile: props.profile
    }

    this.state.profile.showForm = false
    this.onProfileUpdate = this.onProfileUpdate.bind(this)

  }
  // handleChanges is use to update the state based on value
  handleChange = event => {
    const that = this.state
    const profile = {...this.state.profile}
    profile[event.target.name] = event.target.value
    this.setState({profile})
    // we are working with something like this:
    // {
    //   profile : {
    //     name: 'my new name'
    //   }
    // }
    // as opposed to something like this:
    // {
    //   name: 'my new name',
    //   interest: 'my interest'
    // }
  }

  handleEdit(){

  }

  // to delete
  handleDelete = (id, user) => {
    fetch('http://localhost:4741/delete-profile/:id',
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':`Token token=${this.props.user.token}`
        }
      }).then((response) => {
      this.deleteProfile(id)
    })
  }
  // delete method
  deleteProfile = (id) => {
    const newProfiles = this.state.profile.filter((profile) => profile.id !== id)
    this.setState({
      profile: newProfiles
    })
  }

  // to make api call for Put
  onProfileUpdate(event){
    event.preventDefault()

    const { name, occupation, gender, race, interest, hobbies, id } = this.state.profile
    const { flash, history, user } = this.props
    // same as: const flash = this.props.flash
    /* where to put this?
    .then((response) => {
      updateProfile(profile)
    })
    */
    handleUpdate(this.state.profile, user)
      .then(handleErrors)
      .then(res => res.json())
      .then(() => {
        const profile = {...this.state.profile}
        profile.showForm = false
        this.setState({profile})
      })
      .then(() => flash(messages.profileFormSuccess, 'flash-success'))
      .then(() => history.push('/'))
      .catch(() => {
        
        flash(messages.profileFormFailure, 'flash-error')
      })
  }

  showUpdate = (event) => {
    console.log('opening profileform')
    const profile = {...this.state.profile}
    profile.showForm = true
    this.setState({profile})
  }

  render () {

    const { name, occupation, gender, race, interest, hobbies, id} = this.state.profile
    let profileForm
    console.log('show update')
    if(this.props.editable) {
      profileForm =
      <form className='auth-form' onSubmit={this.onProfileUpdate}>
        <h3>Update Profile</h3>

        <label htmlFor="name">Name</label>
        <input
          required
          name="name"
          defaultValue={name}
          type="text"
          placeholder="name"
          onChange={this.handleChange}
        />
        <label htmlFor="occupation">Occupation</label>
        <input
          required
          name="occupation"
          defaultValue={occupation}
          type="text"
          placeholder="Occupation"
          onChange={this.handleChange}
        />
        <label htmlFor="gender">Gender</label>
        <input
          required
          name="gender"
          defaultValue={gender}
          type="text"
          placeholder="Gender Identity"
          onChange={this.handleChange}
        />
        <label htmlFor="race">Race</label>
        <input
          required
          name="race"
          defaultValue={race}
          type="text"
          placeholder="Race"
          onChange={this.handleChange}
        />
        <label htmlFor="interest">Interest</label>
        <input
          required
          name="interest"
          defaultValue={interest}
          type="text"
          placeholder="What are your interest"
          onChange={this.handleChange}
        />
        <label htmlFor="hobbies">Hobbies</label>
        <input
          required
          name="hobbies"
          defaultValue={hobbies}
          type="text"
          placeholder="Hobbies"
          onChange={this.handleChange}
        />
        <input
          required
          name="id"
          defaultValue={id}
          type="hidden"
          placeholder="id"
          onChange={this.handleChange}
        />
        <button type="submit">Update Profile</button>
      </form>
    }

    {/* this defines what the state is */}

    const profileView =
      <div>
        <h3>{this.props.profile.name}</h3>
        <p>{this.props.profile.occupation}</p>
        <p>{this.props.profile.gender}</p>
        <p>{this.props.profile.race}</p>
        <p>{this.props.profile.interest}</p>
        <p>{this.props.profile.hobbies}</p>
        <p>{this.props.profile.id}</p>
        <button>View</button>
        <span className={this.props.editable && this.props.deleteable ? 'show' : 'hide'}>
          <button onClick={this.handleDelete}>Delete</button>
          <button onClick={this.showUpdate}>Edit</button>
        </span>

      </div>

    return (
      <div>
        {name}
        {occupation}
        {gender}
        {race}
        {interest}
        {hobbies}
        {this.state.profile.showForm ? profileForm : profileView}

      </div>
    )
  }
}

export default withRouter(ProfileForm)
