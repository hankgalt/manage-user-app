import React, { Component } from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Button, Col } from 'react-bootstrap';

class UserDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editMode: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      id: nextProps.user ? nextProps.user.id : null,
      first_name: nextProps.user ? nextProps.user.first_name : '',
      last_name: nextProps.user ? nextProps.user.last_name : '',
      email: nextProps.user ? nextProps.user.email : ''
    })
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();

    // add validations

    const { id, first_name, last_name, email } = this.state;
    if (id) {
      this.props.editUser(id, first_name, last_name, email)
    } else {
      this.props.addNewUser(first_name, last_name, email)
    }
  }

  render() {
    return (
      <div className="user-details">
        <Form className="user-detail-form" horizontal>
          <FormGroup controlId="formHorizontal">
            <Col componentClass={ControlLabel} sm={2}>First name: </Col>
            <Col sm={10}><FormControl name="first_name" type="text" placeholder="first name" value={this.state.first_name} onChange={this.handleChange} /></Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>Last name: </Col>
            <Col sm={10}><FormControl name="last_name" type="text" placeholder="last name" value={this.state.last_name} onChange={this.handleChange}/></Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>Email</Col>
            <Col sm={10}><FormControl name="email" type="email" value={this.state.email} placeholder="email" onChange={this.handleChange}/></Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit" onClick={this.handleSubmit}>Submit</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default UserDetail;