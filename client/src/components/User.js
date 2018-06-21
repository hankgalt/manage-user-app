import React from 'react';

const User = ({user, onRemoveUser=f=>f, editingUser=f=>f}) =>
  <div className="single-user" key={user.id}>
    <h4>#{user.first_name} - {user.last_name}</h4>
    <p>{user.other_info}</p>
    <button onClick={() => onRemoveUser(user.id)}>Erase</button>
    <button onClick={() => editingUser(user.id)}>Edit</button>
    <hr/>
  </div>
  
export default User;