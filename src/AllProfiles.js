import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import ProfileForm from './auth/components/ProfileForm'
import Profile from './Profile'
import {handleView} from './auth/api'

const AllProfiles = (props) => {
  const profiles = props.profiles.map((profile) => {
    let editable = false
    if(profile.user === props.user) {
      editable = true
    }
    return(
      <div key={profile.id}>
        <ProfileForm profile={profile} user={props.user} editable={editable} handleView={handleView}
          handleDelete={props.handleDelete} handleUpdate={props.handleUpdate}/>
      </div>
    )
  })
  return(
    <div>
      {profiles}
      
    </div>
  )
}

export default AllProfiles
