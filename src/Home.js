import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import AllProfiles from './AllProfiles'
import Body from './Body'

const Home = (props) => {
  return(
    <div className='text-center'>
      <h1>HomePage</h1>
      <AllProfiles />
    </div>
  )
}

export default Home
