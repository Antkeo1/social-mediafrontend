import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import Body from './Body'

const Home = (props) => {
  return(
    <div className='text-center'>
      <h1></h1>
      <Body user={props.user}/>
    </div>
  )
}

export default Home
