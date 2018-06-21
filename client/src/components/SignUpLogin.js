import React, { Component } from 'react';
import Client from '../utils/Client';

class SignUpLogin extends Component {
  constructor(props) {
    super(props)

    this.state = {
      viewState: 'login'
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleView = this.toggleView.bind(this)
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()

    if (e.target.name === 'login') {
      this.handleLogin()
    } else {
      this.handleSignup()
    }
  }

  handleLogin() {
    let self = this
    const { email, password } = this.state
    const authData = {
      auth: {
        email: email, 
        password: password
      }
    }
    
    Client.getToken(authData).then(jwtToken => {
      return Client.getData('/api/v1/users/current')
    }).then(response => {
      self.props.updateCurrentUser(response.data);
    }).catch(error => {
      self.props.updateCurrentUser(null);
    })
  }

  handleSignup() {
    const { first_name, last_name, email, password, password_confirmation } = this.state
    const data = {
      user: {
        first_name, 
        last_name,
        email, 
        password,
        password_confirmation
      }
    }

    Client.getData('/api/v1/users/create', { 
      method: 'PUT', 
      data: data 
    }).then(response => {
      console.log(response)
    }).catch(error => {
      console.log(error)
    })
  }

  toggleView = (e) => {
    this.setState({
      viewState: this.state.viewState === 'login' ? 'signup' : 'login'
    })
  }

  render() {
    return (
      <div>
        { this.state.viewState === 'login' ? <form name="login" onSubmit={this.handleSubmit}>
          <label htmlFor="email">
            Email: 
            <input name="email" id="email" type="email" onChange={this.handleChange} />
          </label><br />
          <label htmlFor="password">
            Password:
            <input name="password" id="password" type="password" onChange={this.handleChange} />
          </label><br />
          <input type="submit" value="Submit" />
          <button onClick={this.toggleView}>Click to sign up</button>
        </form> :
        <form name="signup" onSubmit={this.handleSubmit}>
          <label htmlFor="first_name">
            First Name: 
            <input name="first_name" id="first_name" type="text" onChange={this.handleChange} />
          </label><br />
          <label htmlFor="last_name">
            Last name:
            <input name="last_name" id="last_name" type="text" onChange={this.handleChange} />
          </label><br />
          <label htmlFor="email">
            Email: 
            <input name="email" id="email" type="email" onChange={this.handleChange} />
          </label><br />
          <label htmlFor="password">
            Password:
            <input name="password" id="password" type="password" onChange={this.handleChange} />
          </label><br />
          <label htmlFor="password_confirmation">
            Password confirmation:
            <input name="password_confirmation" id="password_confirmation" type="password" onChange={this.handleChange} />
          </label><br />
          <label htmlFor="other_info">
            Other info:
            <input name="other_info" id="other_info" type="text" onChange={this.handleChange} />
          </label><br />
          <input type="submit" value="Submit" />
          <button onClick={this.toggleView}>Click to log in</button>
        </form> }
      </div>
    )
  }
}

export default SignUpLogin;
