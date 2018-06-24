import React, { Component } from 'react';

import { Button } from 'react-bootstrap';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

class User extends Component {
  constructor(props) {
    super(props)
    let isInEdit = props.editingUser && props.editingUser.id === props.user.id
    this.state = {
      isInEdit: isInEdit
    }

    this.edit = this.edit.bind(this)
    this.remove = this.remove.bind(this)
  }

  edit() {
    this.props.showDetails(this.props.user.id);
  }

  remove() {
    this.props.removeUser(this.props.user.id);
  }

  render() {
    let user = this.props.user
    let isInEdit = this.props.editingUser && this.props.editingUser.id === user.id

    return (
      <div className={"single-user " + (isInEdit ? 'selected' : '')}>
        <span className="user-info">{user.first_name}, {user.last_name}</span>
        <span className="user-actions">
          <Button id={user.id} onClick={this.edit} bsSize="xsmall"><Glyphicon glyph="pencil" /></Button>
          <Button id={user.id} onClick={this.remove} bsSize="xsmall"><Glyphicon glyph="trash" /></Button>
        </span>
      </div>
    )
  }
}

export default User;