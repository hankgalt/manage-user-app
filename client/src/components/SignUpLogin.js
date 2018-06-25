import React, { Component } from 'react';

import Client from '../utils/Client';
import FormComponent from './FormComponent';

class SignUpLogin extends Component {
  constructor(props) {
    super(props)

    this.state = {
      viewState: 'login'
    }

    this.toggleView = this.toggleView.bind(this)
    this.signUpForm = this.signUpForm.bind(this)
    this.loginForm = this.loginForm.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleSignup = this.handleSignup.bind(this)

    this.loginForm = this.loginForm.bind(this)
  }

  handleLogin(formData) {
    let self = this
    const authData = {
      auth: {
        email: formData.login, 
        password: formData.loginPassword
      }
    }
    
    return Client.token(authData).then(jwtToken => {
      return Client.api('/api/v1/users/current')
    }).then(response => {
      self.props.updateCurrentUser(response.data);
      return Promise.resolve(response)
    }).catch(error => {
      self.props.updateCurrentUser(null);
      return Promise.reject(error)
    })
  }

  handleSignup(formData) {
    let self = this
    const data = {
      user: {
        first_name: formData.first_name, 
        last_name: formData.last_name,
        email: formData.email, 
        password: formData.password,
        password_confirmation: formData.password_confirmation
      }
    }

    return Client.signup(data).then(response => {
      self.setState({
        viewState: 'login'
      })
      return Promise.resolve(response)
    })
  }

  toggleView = (e) => {
    this.setState({
      viewState: this.state.viewState === 'login' ? 'signup' : 'login'
    })
  }

  signUpForm() {
    let formOptions = {
      formName: "signup",
      formClassName: "signup-form",
      formOnSubmit: this.handleSignup,
      buttonActionLabel: "Sign up",
      additionalActionLabel: "Click here to login",
      fields: [
        {
          name: "first_name",
          type: "text",
          label: "First name: ",
          required: true
        },
        {
          name: "last_name",
          type: "text",
          label: "Last name: ",
          required: true
        },
        {
          name: "email",
          type: "email",
          label: "Email: ",
          required: true
        },
        {
          name: "password",
          type: "password",
          label: "Password: ",
          required: true
        },
        {
          name: "password_confirmation",
          type: "password",
          label: "Password confirmation: ",
          required: true
        }
      ],
      additionalAction: this.toggleView
    }

    return (
      <div className="spacer-form">
        <FormComponent formOptions={formOptions}></FormComponent>
      </div>
    )
  }

  loginForm() {
    let formOptions = {
      formName: "login",
      formClassName: "login-form",
      formOnSubmit: this.handleLogin,
      buttonActionLabel: "Login",
      additionalActionLabel: "Click here to sign up",
      fields: [
        {
          name: "login",
          type: "email",
          label: "Email: ",
          required: true
        },
        {
          name: "loginPassword",
          type: "password",
          label: "Password: ",
          required: true
        }
      ],
      additionalAction: this.toggleView
    }
    return (
      <div className="spacer-form">
        <FormComponent formOptions={formOptions}></FormComponent>
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
