import React, { Component } from 'react';
import './App.css';

import Client from './utils/Client';

import SignUpLogin from './components/SignUpLogin';
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

    Client.getJWToken().then(jwtToken => {
      return Client.getData('/api/v1/users/current')
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
        </header>
        { this.isLoggedIn() ? <UsersContainer currentUser={this.state.currentUser} logout={this.logout}/> : <SignUpLogin updateCurrentUser={this.updateCurrentUser}/> }
      </div>
    );
  }
}

export default App;
