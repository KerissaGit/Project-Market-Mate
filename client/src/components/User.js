import React from 'react';


function User({ user, onLogout }) {
  if (!user) return null;


  return (
    <div className="user-banner">
      <p>Welcome, <strong>{user.username}</strong>!</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}


export default User;
