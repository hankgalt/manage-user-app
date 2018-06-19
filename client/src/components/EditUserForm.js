import React, { Component } from 'react';

class EditUserForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.user.id,
      first_name: this.props.user.title,
      last_name: this.props.user.title,
      other_info: this.props.user.excerpt
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e){
    e.preventDefault();
    const { id, first_name, last_name, other_info } = this.state;
    this.props.editList(id, first_name, last_name, other_info);
  }
  
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input name="first_name" type="text" placeholder="First name..."
          value={this.state.first_name} onChange={this.handleChange} />
        <input name="last_name" type="text" placeholder="Last name..."
          value={this.state.last_name} onChange={this.handleChange} />
        <input name="other_info" type="text" placeholder="Other info..."
          value={this.state.other_info} onChange={this.handleChange} />
        <button>Update User</button>
      </form>  
    )
  }
}

export default EditUserForm;