import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

const AllProfiles = (props) => {

  profiles = this.state.profiles.map((profile) => {
    return(
      <div key={profile.id}>
        <h1>{profile.name}</h1>
        <p>{profile.occupation}</p>
        <p>{profile.gender}</p>
        <p>{profile.race}</p>
        <p>{profile.interest}</p>
        <p>{profile.hobbies}</p>
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
