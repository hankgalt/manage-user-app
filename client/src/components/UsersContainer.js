import React, { Component } from 'react';

import Client from '../utils/Client';

import NewUserForm from './NewUserForm';
import UserDetail from './UserDetail';

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
    this.showDetails = this.showDetails.bind(this)
  }

  componentDidMount() {
    let self = this;

    Client.getData('api/v1/users').then(response => {
      self.setState({
        users: response.data
      })
    }).catch(error => {
      self.setState({
        users: []
      })
    })
  }

  addNewUser(first_name, last_name, other_info) {
    Client.getData('/api/v1/users/create', { 
      method: 'PUT', 
      data: { user: {first_name, last_name, other_info} } 
    }).then(response => {
      console.log(response)
      const users = [ ...this.state.users, response.data ]
      this.setState({users})
    }).catch(error => {
      console.log(error)
    })
  }

  removeUser(id) {
    Client.getData('/api/v1/user/' + id, { 
      method: 'DELETE' 
    }).then(response => {
      const users = this.state.users.filter(
        user => user.id !== id
      )
      this.setState({users})
    }).catch(error => {
      console.log(error)
    })
  }

  editingUser(id) {
    this.setState({
      editingUserId: id
    })
  }

  editUser(id, first_name, last_name, email, other_info) {
    Client.getData('/api/v1/user/' + id, { 
      method: 'PATCH',
      data: { user: { first_name, last_name, email, other_info } }
    }).then(response => {
      const users = this.state.users;
      users[id] = {id, first_name, last_name, email, other_info}
      this.setState(() => ({
        users, 
        editingUserId: null
      }))
    }).catch(error => {
      console.log(error)
    });
  }

  showDetails(event) {
    const { id } = event.target;
    this.setState({
      editingUserId: parseInt(id, 0)
    })
  }

  render() {
    let selectedUser = this.state.users.find(x => { return x.id === this.state.editingUserId });
    return (
      <div className="users-pane">
        <div className="top-pane">
          <div className="current-user" key={this.props.currentUser.id}>
            {this.props.currentUser.first_name}, {this.props.currentUser.last_name}
          </div>
        </div>
        <div className="data-pane">
          <div className="user-list">
            { this.state.users.map( user => {
              return (
                <div className="single-user" id={user.id} key={user.id} onClick={this.showDetails}>
                  {user.first_name}, {user.last_name}
                </div>
              )
            })}
          </div>
          <UserDetail user={selectedUser} editUser={this.editUser}/>
        </div>
      </div>
    )
  }
}

export default UsersContainer;
