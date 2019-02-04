const apiUrl = 'https://profile-app1.herokuapp.com'

export const handleErrors = res => {
  if (res.ok) {
    return res
  } else  {
    throw new Error('Recieved status in 400 or 500 range.')
  }
}

export const signUp = credentials => {
  return fetch('https://profile-app1.herokuapp.com/sign-up', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      credentials: {
        email: credentials.email,
        password: credentials.password,
        password_confirmation: credentials.passwordConfirmation
      }
    })
  })
}

export const signIn = credentials => {
  return fetch('https://profile-app1.herokuapp.com/sign-in', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      credentials: {
        email: credentials.email,
        password: credentials.password,
      }
    })
  })
}

export const signOut = user => {
  return fetch(apiUrl + '/sign-out', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    }
  })
}

export const changePassword = (passwords, user) => {
  return fetch(apiUrl + '/change-password', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    },
    body: JSON.stringify({
      passwords: {
        old: passwords.oldPassword,
        new: passwords.newPassword
      }
    })
  })
}

export const createProfile = (profile, user) => {
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
// to View
export const handleView = (profile, user) => {
  return fetch(`https://profile-app1.herokuapp.com/profiles/${profile.id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
    console.log('Profile is viewed!')
  })
}

// to delete
export const handleDelete = (id, user) => {
  return fetch( `https://profile-app1.herokuapp.com/profiles/${profile.id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Token token=${user.token}`
      }
    })
}

// to edit
export const handleUpdate = (profile) => {
  return fetch(`https://profile-app1.herokuapp.com/profiles/${profile.id}`,
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
export const updateProfile= (profile) => {
  const newProfiles = this.state.profiles.filter((p) => p.id !== profile.id)
  newProfiles.push(profile)
  this.setState({
    profiles: newProfiles
  })
}
