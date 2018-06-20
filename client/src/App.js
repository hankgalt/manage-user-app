import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

// import UsersContainer from './components/UsersContainer';

class App extends Component {

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.login = this.login.bind(this)
  }

  getUser() {
    let token = "Bearer " + localStorage.getItem("jwt")
    let authOptions = {
      url: '/api/v1/users/current',
      headers: {
        'Authorization': token
      }
    };
    console.log(token)

    axios(authOptions).then(function(response) {
      console.log(response)
      this.setState({usersReceived: JSON.stringify(response)})
    }).catch(function(error){
      console.log(error);
    })
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  login(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const request = {"auth": {"email": email, "password": password}}
    console.log(request)

    var authOptions = {
      method: 'POST',
      url: '/api/v1/user_token',
      data: request,
      json: true
    };

    axios(authOptions)
    .then(response => {
      console.log(response)
      localStorage.setItem("jwt", response.data.jwt)
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to User Management</h1>
        </header>
        <form>
          <label htmlFor="email">Email: </label>
          <input name="email" id="email" type="email" onChange={this.handleChange} />
          <label htmlFor="password">Password:</label>
          <input name="password" type="password" id="password" onChange={this.handleChange} />
        </form>
        <br />
        <button onClick={this.login}> Login </button>
        <br />
        <button onClick={this.getUser}> Get Users </button>
      </div>
    );
  }
}

export default App;
