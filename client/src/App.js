import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import LoginForm from './components/LoginForm';
import UsersContainer from './components/UsersContainer';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      currentUser: null
    }

    this.logout = this.logout.bind(this)
    this.updateCurrentUser = this.updateCurrentUser.bind(this)
  }

  componentDidMount() {
    let self = this;

    this.getJWToken().then(jwtToken => {
      return jwtToken === '' ? Promise.reject() : Promise.resolve(self.getUser(jwtToken))
    }).then(response => {
      self.updateCurrentUser(response.data);
    }).catch(error => {
      self.updateCurrentUser(null);
    })
  }

  updateCurrentUser(user) {
    this.setState({
      currentUser: user
    })
  }

  getJWToken() {
    return Promise.resolve(localStorage.getItem("jwt"))
  }

  getUser(jwtToken) {
    let token = "Bearer " + jwtToken
    let authOptions = {
      url: '/api/v1/users/current',
      headers: {
        'Authorization': token
      }
    };
    return axios(authOptions);
  } 

  isLoggedIn() {
    return this.state.currentUser !== null;
  }

  logout() {
    localStorage.setItem("jwt", "");
    this.updateCurrentUser(null);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to User Management</h1>
          { this.isLoggedIn() ? <h1 className="App-title">{this.state.currentUser.first_name}</h1> : <h1 className="App-title"> Please sign-in </h1> }
          { this.isLoggedIn() ? <button onClick={this.logout}> Logout </button> : null }
        </header>
          { this.isLoggedIn() ? <UsersContainer getJWToken={this.getJWToken}/> : <LoginForm updateCurrentUser={this.updateCurrentUser}/> }
      </div>
    );
  }
}

export default App;
