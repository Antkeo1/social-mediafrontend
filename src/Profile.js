import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import ProfileForm from './auth/components/ProfileForm'
import {handleErrors, handleView, handleEdit, handleDelete} from './auth/api'
import messages from './auth/messages'



class Profile extends Component{
  constructor () {
    super()
    this.state = [{
      editable: false
    }]
    this.handleEdit = this.handleEdit.bind(this)
  }
  // edit
  handleEdit(){
    if(this.state.editable){
      const name = this.state.name.value
      const occupation= this.state.occupation.value
      const gender= this.gender.value
      const race = this.race.value
      const interest = this.interest.value
      const hobbies = this.hobbies.value
      const id = this.props.fruit.id
      const profile = {profile: {id: id, name: name, occupation: occupation,
        gender: gender, race: race, interest: interest, hobbies: hobbies}}
      this.props.handleUpdate(profile)
    }
    this.setState({
      editable: !this.state.editable
    })
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  render(){
    const name = this.state.editable ? <input type='text'
      ref={input => this.name = input}
      defaultValue={this.props.profile.name}/>:<h3>{this.props.profile.name}</h3>

    const occupation = this.state.editable ? <input type='text'
      ref={input => this.occupation = input}
      defaultValue={this.props.profile.occupation}/>:<p>{this.props.profile.occupation}</p>

    const gender = this.state.editable ? <input type='text'
      ref={input => this.gender = input}
      defaultValue={this.props.profile.gender}/>:<p>{this.props.profile.gender}</p>

    const race = this.state.editable ? <input type='text'
      ref={input => this.race = input}
      defaultValue={this.props.profile.race}/>:<p>{this.props.profile.race}</p>

    const interest = this.state.editable ? <input type='text'
      ref={input => this.interest = input}
      defaultValue={this.props.profile.interest}/>:<p>{this.props.profile.interest}</p>

    const hobbies = this.state.editable ? <input type='text'
      ref={input => this.hobbies = input}
      defaultValue={this.props.profile.hobbies}/>:<p>{this.props.profile.hobbies}</p>
    return(
      <form className='auth-form'>
        {name}
        {occupation}
        {gender}
        {race}
        {interest}
        {hobbies}
        <button onClick={() => this.handleEdit()}>{this.state.editable? 'Submit' : 'Edit'}</button>
        <button onClick={() => this.props.handleView(this.props.profile.id)}>View</button>
        <button onClick={() => this.props.handleDelete(this.props.profile.id)}>Delete</button>
      </form>
    )
  }
}

export default Profile
