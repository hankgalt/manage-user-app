import React, { Component } from 'react';
import axios from 'axios';

class LoginForm extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.login = this.login.bind(this)
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  login(e) {
    e.preventDefault();
    let self = this;
    const { email, password } = this.state;
    const request = {"auth": {"email": email, "password": password}};
    var authOptions = {
      method: 'POST',
      url: '/api/v1/user_token',
      data: request,
      json: true
    };

    axios(authOptions).then(response => {
      localStorage.setItem("jwt", response.data.jwt)
      return Promise.resolve(response.data.jwt)
    }).then(jwtToken => {
      let token = "Bearer " + jwtToken
      let authOptions = {
        url: '/api/v1/users/current',
        headers: {
          'Authorization': token
        }
      };
      return axios(authOptions);
    }).then(response => {
      self.props.updateCurrentUser(response.data);
    }).catch(error => {
      console.log(error)
    })
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    return (
      <div>
        <form>
          <label htmlFor="email">Email: </label>
          <input name="email" id="email" type="email" onChange={this.handleChange} /><br />
          <label htmlFor="password">Password:</label>
          <input name="password" type="password" id="password" onChange={this.handleChange} />
        </form> <br />
        <button onClick={this.login}> Login </button><br />
      </div>
    )
  }
}

export default LoginForm;