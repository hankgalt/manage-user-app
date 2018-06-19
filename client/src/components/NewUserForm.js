import React from 'react';

const NewUserForm = ({onNewUser = f => f}) => {
  let first_name, last_name, other_info
  const submit = e => {
    e.preventDefault()
    onNewUser(first_name.value, last_name.value, other_info.value)
    first_name.value = ''
    last_name.value = ''
    other_info.value = ''
    first_name.focus()
  }

  return (
    <form onSubmit={submit}>
      <input ref={input => first_name = input}
              type="text"
              placeholder="First name..." required />
      <input ref={input => last_name = input}
              type="text"
              placeholder="Last name..." required />
      <input ref={input => other_info = input}
              type="text"
              placeholder="Other info..." required />
      <button>Add User</button>
    </form>
  )
}

export default NewUserForm;