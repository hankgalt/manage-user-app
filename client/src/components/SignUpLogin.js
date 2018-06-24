import React, { Component } from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Button, Col } from 'react-bootstrap';

import Client from '../utils/Client';

class SignUpLogin extends Component {
  constructor(props) {
    super(props)

    this.state = {
      viewState: 'login'
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleView = this.toggleView.bind(this)
    this.signUpForm = this.signUpForm.bind(this)
    this.loginForm = this.loginForm.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleSignup = this.handleSignup.bind(this)
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()

    if (this.state.viewState === 'login') {
      this.handleLogin()
    } else {
      this.handleSignup()
    }
  }

  handleLogin() {
    let self = this
    const { login, loginPassword } = this.state
    const authData = {
      auth: {
        email: login, 
        password: loginPassword
      }
    }
    
    Client.getToken(authData).then(jwtToken => {
      return Client.getData('/api/v1/users/current')
    }).then(response => {
      self.props.updateCurrentUser(response.data);
    }).catch(error => {
      self.props.updateCurrentUser(null);
    })
  }

  handleSignup() {
    const { first_name, last_name, email, password, password_confirmation } = this.state
    const data = {
      user: {
        first_name, 
        last_name,
        email, 
        password,
        password_confirmation
      }
    }

    Client.getData('/api/v1/users/create', { 
      method: 'PUT', 
      data: data 
    }).then(response => {
      console.log(response)
    }).catch(error => {
      console.log(error)
    })
  }

  toggleView = (e) => {
    this.setState({
      viewState: this.state.viewState === 'login' ? 'signup' : 'login'
    })
  }

  signUpForm() {
    return (
      <div className="spacer-form">
        <Form name="signup" className="signup-form" horizontal>
          <FormGroup controlId="formHorizontalFirstName">
            <Col componentClass={ControlLabel} sm={2}>First name: </Col>
            <Col sm={10}><FormControl name="first_name" type="text" onChange={this.handleChange} /></Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalLastName">
            <Col componentClass={ControlLabel} sm={2}>Last name: </Col>
            <Col sm={10}><FormControl name="last_name" type="text" onChange={this.handleChange}/></Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>Email</Col>
            <Col sm={10}><FormControl name="email" type="email" onChange={this.handleChange}/></Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>Password: </Col>
            <Col sm={10}><FormControl name="password" type="password" onChange={this.handleChange}/></Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPasswordConfirmation">
            <Col componentClass={ControlLabel} sm={2}>Password confirmation:</Col>
            <Col sm={10}><FormControl name="password_confirmation" type="password" onChange={this.handleChange}/></Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <div className="actions">
                <Button type="submit" onClick={this.handleSubmit}>Sign up</Button>
                <Button onClick={this.toggleView}>Click to log in</Button>
              </div>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }

  loginForm() {
    return (
      <div className="spacer-form">
        <Form name="login" className="login-form" horizontal>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>Email: </Col>
            <Col sm={10}><FormControl name="login" type="email" onChange={this.handleChange} /></Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>Password: </Col>
            <Col sm={10}><FormControl name="loginPassword" type="password" onChange={this.handleChange}/></Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <div className="actions">
                <Button type="submit" onClick={this.handleSubmit}>Login</Button>
                <Button onClick={this.toggleView}>Click to sign up</Button>
              </div>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }

  render() {
    return (
      <div className="landing-form">
        <div className="form-spacer"></div>
        { this.state.viewState === 'login' ? this.loginForm() : this.signUpForm() }
        <div className="form-spacer"></div>
      </div>
    )
  }
}

export default SignUpLogin;
