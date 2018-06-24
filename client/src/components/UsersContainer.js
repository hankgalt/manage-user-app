import React, { Component } from 'react';

import Client from '../utils/Client';
import UserDetail from './UserDetail';

class UsersContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      users: [],
      editingUser: null,
      editingUserIndex: null
    }
    this.addNewUser = this.addNewUser.bind(this)
    this.removeUser = this.removeUser.bind(this)
    this.editUser = this.editUser.bind(this)
    this.showDetails = this.showDetails.bind(this)
  }

  componentDidMount() {
    let self = this;

    Client.getData('api/v1/users').then(response => {
      self.setState({
        users: response.data.filter(user => user.id !== this.props.currentUser.id)
      })
    }).catch(error => {
      self.setState({
        users: []
      })
    })
  }

  addNewUser(first_name, last_name, email) {
    let self = this

    Client.getData('/api/v1/users/create', { 
      method: 'POST', 
      data: { user: {first_name, last_name, email} } 
    }).then(response => {
      console.log(response)
      const users = [ ...self.state.users, response.data ]
      self.setState({users})
    }).catch((error, response) => {
      console.log(error.response.data)
    })
  }

  removeUser(id) {
    let self = this

    Client.getData('/api/v1/user/' + id, { 
      method: 'DELETE' 
    }).then(response => {
      const users = self.state.users.filter(
        user => user.id !== id
      )
      self.setState({users})
    }).catch(error => {
      console.log(error)
    })
  }

  editUser(id, first_name, last_name, email) {
    let self = this

    Client.getData('/api/v1/user/' + id, { 
      method: 'PATCH',
      data: { user: { first_name, last_name, email } }
    }).then(response => {
      const users = self.state.users;
      users[self.state.editingUserIndex] = {id, first_name, last_name, email}
      self.setState(() => ({
        users, 
        editingUser: null,
        editingUserIndex: null
      }))
    }).catch(error => {
      console.log(error)
    });
  }

  showDetails(event) {
    const { id } = event.target;
    let editingUserIndex = this.state.users.findIndex(user => { 
      return user.id === parseInt(id, 0)
    });

    this.setState({
      editingUser: id ? this.state.users[editingUserIndex] : null,
      editingUserIndex: id ? editingUserIndex : null
    })
  }

  render() {
    let currentUser = this.props.currentUser
    let editingUser = this.state.editingUser
    let users = this.state.users

    return (
      <div className="users-pane">
        <div className="top-pane">
          <span className="current-user" key={currentUser.id}>
            {currentUser.first_name}, {currentUser.last_name}
          </span>
          <span className="add-user">
            <button onClick={this.showDetails}>Add New User</button>
          </span>
        </div>
        <div className="data-pane">
          <div className="user-list">
            { users.map( user => {
              return (
                <div className={"single-user " + (editingUser && editingUser.id === user.id ? 'selected' : '')} id={user.id} key={user.id} onClick={this.showDetails}>
                  {user.first_name}, {user.last_name}
                </div>
              )
            })}
          </div>
          <UserDetail user={editingUser} editUser={this.editUser} addNewUser={this.addNewUser}/>
        </div>
      </div>
    )
  }
}

export default UsersContainer;
