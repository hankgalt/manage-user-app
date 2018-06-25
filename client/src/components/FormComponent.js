import React, { Component } from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Button, Col } from 'react-bootstrap';

import Inflection from 'inflection';

class FormComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formValid: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.isFormValid = this.isFormValid.bind(this)
    this.buildErrors = this.buildErrors.bind(this)
    this.renderErrors = this.renderErrors.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    let state = this.state
    let formData = nextProps.formOptions.fields.map(field => field.name ).reduce((o, k) => { 

      let formField = nextProps.formOptions.fields.find(field => { 
        return field.name === k
      });

      o[k] = formField.value || state[k] || null; 
      return o; 
    }, {});
    this.setState(Object.assign(formData, {
      formValid: this.isFormValid(formData, nextProps.formOptions),
      errors: null,
      messages: null
    }))
  }

  handleChange = (e) => {
    let valToUpdate = {
      [e.target.name]: e.target.value
    }
    let isFormValid = this.isFormValid(valToUpdate, this.props.formOptions);

    this.setState(Object.assign(valToUpdate, {formValid: isFormValid}))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    let self = this
    let state = this.state
    let formOptions = this.props.formOptions
    let formData = formOptions.fields.map(field => field.name ).reduce((o, k) => { 
      o[k] = state[k]; 
      return o; 
    }, {});

    formOptions.formOnSubmit(formData).then(response => {
      console.log(response)
      self.setState({
        messages: ["Update successfully"],
        errors: null
      })
    }).catch((error) => {
      self.setState({
        messages: null,
        errors: self.buildErrors(error)
      })
    })
  }

  buildErrors(error) {
    let errors = this.state.errors || {}
    if (error.response.data && error.response.data === Object(error.response.data)) {
      Object.keys(error.response.data).forEach(key => {
        errors[key] = error[key] || []
        error.response.data[key].forEach(error => {
          errors[key].push(key + ": " + error)
        })
      })
    } else {
      errors.server = error.server || []
      errors.server.push(error.response.status + ": " + error.response.statusText)
    }

    return errors
  }

  renderErrors(errors) {
    let errorArr = [];

    Object.keys(errors).forEach(context => {
      errors[context].forEach(error => {
        errorArr.push((<div key={"error"+error.length}>{error}</div>))
      })
    })

    return (
      <div className="form-errors" key="form-errors">
        {errorArr}
      </div>
    )
  }

  renderMessages(messages) {
    let messageArr = [];

    messages.forEach(message => {
      messageArr.push((<div key={"message"+message.length}>{message}</div>))
    })

    return (
      <div className="form-messages" key="form-messages">
        {messageArr}
      </div>
    )
  }

  isFormValid(valToUpdate, formOptions) {
    let state = this.state
    let formData = formOptions.fields.map(field => field.name ).reduce((o, k) => { 
      o[k] = state[k]; 
      return o; 
    }, {});

    let formValid = Object.keys(formData).every(function(key) {
      let formField = formOptions.fields.find(field => { 
        return field.name === key
      });

      if (formField.required) {
        if (!formData[key] && (!valToUpdate || !valToUpdate[key])) {
          return false;
        }
      }
      return true
    })

    return formValid
  }

  render() {
    let formOptions = this.props.formOptions
    let state = this.state
    let errors = state.errors
    let messages = state.messages
    return (
      <Form name={formOptions.formName} className={formOptions.formClassName} horizontal>
        { errors ? this.renderErrors(errors) : null }
        { messages ? this.renderMessages(messages) : null }
        { formOptions.fields.map( field => {
          let formGroupKey = "formHorizontal" + Inflection.capitalize(field.name)
          return (
            <FormGroup key={formGroupKey} controlId={formGroupKey}>
              <Col componentClass={ControlLabel} sm={2}>{field.label}</Col>
              <Col sm={10}><FormControl key={field.name} name={field.name} type={field.type} value={state[field.name]} onChange={this.handleChange} /></Col>
            </FormGroup>
          )
        })}
        <FormGroup key="form-actions">
          <Col smOffset={2} sm={10}>
            <div key="actions" className="actions">
              <Button type="submit" onClick={this.handleSubmit} disabled={!state.formValid}>{formOptions.buttonActionLabel}</Button>
              { formOptions.additionalAction ? <Button onClick={formOptions.additionalAction}>{formOptions.additionalActionLabel}</Button> : null }
            </div>
          </Col>
        </FormGroup>
      </Form>
    )
  }
}

export default FormComponent;