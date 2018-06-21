import React, { Component } from 'react';

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
    if (nextProps.user) {
      this.setState({
        id: nextProps.user.id,
        first_name: nextProps.user.first_name,
        last_name: nextProps.user.last_name,
        email: nextProps.user.email,
        other_info: nextProps.user.other_info
      })
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e){
    e.preventDefault();
    const { id, first_name, last_name, email, other_info } = this.state;
    console.log(id, first_name, last_name, email, other_info)
    this.props.editUser(id, first_name, last_name, email, other_info)
  }
  
  render() {
    return (
      <div className="user-details">
        <form className="user-detail-form" onSubmit={this.handleSubmit}>
          <div className="form-input">
            <label htmlFor="first_name">
              First Name: 
              <input name="first_name" type="text" value={this.state.first_name} onChange={this.handleChange}/>
            </label>
          </div>
          <div className="form-input">
            <label htmlFor="last_name">
              Last name:
              <input name="last_name" type="text" value={this.state.last_name} onChange={this.handleChange}/>
            </label>
          </div>
          <div className="form-input">
            <label htmlFor="email">
              Email: 
              <input name="email" type="email" value={this.state.email} onChange={this.handleChange}/>
            </label>
          </div>
          <div className="form-input">
            <label htmlFor="other_info">
              Other info:
              <input name="other_info" type="text" value={this.state.other_info} onChange={this.handleChange}/>
            </label>
          </div>
          <div>
            <input type="submit" value="Submit" />
          </div>
        </form> 
      </div>
    )
  }
}

export default UserDetail;