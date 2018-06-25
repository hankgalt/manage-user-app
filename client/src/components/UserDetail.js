import React, { Component } from 'react';

import FormComponent from './FormComponent';

class UserDetail extends Component {
  constructor(props) {
    super(props)
    
    this.handleSave = this.handleSave.bind(this)
  }

  handleSave(formData) {
    const { first_name, last_name, email } = formData;
    let user = this.props.user
    if (user && user.id) {
      return this.props.editUser(user.id, first_name, last_name, email)
    } else {
      return this.props.addNewUser(first_name, last_name, email)
    }
  }

  render() {
    let user = this.props.user
    let formOptions = {
      formName: "user-detail",
      formClassName: "user-detail-form",
      formOnSubmit: this.handleSave,
      buttonActionLabel: "Submit",
      fields: [
        {
          name: "first_name",
          type: "text",
          label: "First name: ",
          value: user ? user.first_name : '',
          required: true
        },
        {
          name: "last_name",
          type: "text",
          label: "Last name: ",
          value: user ? user.last_name : '',
          required: true
        },
        {
          name: "email",
          type: "email",
          label: "Email: ",
          value: user ? user.email : '',
          required: true
        }
      ]
    }

    return (
      <div className="user-details">
        <FormComponent formOptions={formOptions}></FormComponent>
      </div>
    )
  }
}

export default UserDetail;