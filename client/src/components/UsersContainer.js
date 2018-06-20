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
    console.log("componentDidMount()")
    let self = this;

    Promise.resolve(localStorage.getItem("jwt")).then(jwtToken => {
      return jwtToken === '' ? Promise.reject() : Promise.resolve(self.getUsers(jwtToken))
    }).then(response => {
      console.log("componentDidMount() - response: %o", response)
      self.setState({
        users: response.data
      })
    }).catch(error => {
      console.log("componentDidMount() - error: %o", error);
      self.setState({
        users: []
      })
    })
  }

  getUsers(jwtToken) {
    let token = "Bearer " + jwtToken
    let authOptions = {
      url: 'api/v1/users',
      headers: {
        'Authorization': token
      }
    };
    
    return axios(authOptions);
  } 

  addNewUser(first_name, last_name, other_info) {
    this.props.getJWToken().then(jwtToken => {
      let token, authOptions;

      if (jwtToken === '') {
        return Promise.reject()
      } else {
        token = "Bearer " + jwtToken
        authOptions = {
          url: '/api/v1/users/current',
          method: 'PUT',
          headers: {
            'Authorization': token
          },
          data: { user: {first_name, last_name, other_info} }
        };
        return axios(authOptions)
      }
    }).then(response => {
      console.log(response)
      const users = [ ...this.state.users, response.data ]
      this.setState({users})
    }).catch(error => {
      console.log(error)
    })
  }

  removeUser(id) {
    this.props.getJWToken().then(jwtToken => {
      let token, authOptions;

      if (jwtToken === '') {
        return Promise.reject()
      } else {
        token = "Bearer " + jwtToken
        authOptions = {
          method: 'DELETE',
          url: '/api/v1/user/' + id,
          headers: {
            'Authorization': token
          }
        };
        return axios(authOptions)
      }
    }).then(response => {
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
    this.props.getJWToken().then(jwtToken => {
      let token, authOptions;

      if (jwtToken === '') {
        return Promise.reject()
      } else {
        token = "Bearer " + jwtToken
        authOptions = {
          method: 'PATCH',
          url: '/api/v1/user/' + id,
          data: { 
            user: {
              first_name, 
              last_name,
              other_info
            }
          },
          headers: {
            'Authorization': token
          }
        };
        return axios(authOptions)
      }
    }).then(response => {
      console.log(response);
      const users = this.state.users;
      users[id-1] = {id, first_name, other_info}
      this.setState(() => ({
        users, 
        editingUserId: null
      }))
    }).catch(error => console.log(error));
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
