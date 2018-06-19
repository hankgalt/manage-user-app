import React, { Component } from 'react';
import axios from 'axios';

import User from './User';
import NewUserForm from './NewUserForm';
import EditUserForm from './EditUserForm';

class UsersContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      users: [],
      editingUserId: null
    }
    this.addNewUser = this.addNewUser.bind(this)
    this.removeUser = this.removeUser.bind(this)
    this.editingUser = this.editingUser.bind(this)
    this.editUser = this.editUser.bind(this)
  }

  componentDidMount() {
    axios.get('api/v1/users.json')
    .then(response => {
      console.log(response)
      this.setState({
          users: response.data
      })
    })
    .catch(error => console.log(error))
  }

  addNewUser(first_name, last_name, other_info) {
    axios.post( '/api/v1/users', { user: {first_name, last_name, other_info} })
    .then(response => {
      console.log(response)
      const users = [ ...this.state.users, response.data ]
      this.setState({users})
    })
    .catch(error => {
      console.log(error)
    })
  }

  removeUser(id) {
    axios.delete( '/api/v1/users/' + id )
    .then(response => {
      const users = this.state.users.filter(
        user => user.id !== id
      )
      this.setState({users})
    })
    .catch(error => console.log(error))
  }

  editingUser(id) {
    this.setState({
      editingUserId: id
    })
  }

  editUser(id, first_name, last_name, other_info) {
    axios.put( '/api/v1/users/' + id, { 
      user: {
        first_name, 
        last_name,
        other_info
      } 
    })
    .then(response => {
      console.log(response);
      const users = this.state.users;
      users[id-1] = {id, first_name, other_info}
      this.setState(() => ({
        users, 
        editingUserId: null
      }))
    })
    .catch(error => console.log(error));
  }


  render() {
    return (
      <div className="users-container">
        {this.state.users.map( user => {
          if ( this.state.editingUserId === user.id ) {
            return (
              <EditUserForm user={user} key={user.id} editUser={this.editUser} />
            )
          } else {
            return (
              <User user={user} key={user.id} onRemoveUser={this.removeUser} editingUser={this.editingUser} />
            )
          }
        })}
        <NewUserForm onNewUser={this.addNewUser} />
      </div>
    )
  }
}

export default UsersContainer;