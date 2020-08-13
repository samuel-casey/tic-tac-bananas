import React from 'react';

export const Account = (props) => {
  const userEmail = props.authUser ? props.authUser.email : null
  return (
    <div>
      <h1>Account</h1>
      <h3>{`Email: ${userEmail}`}</h3>
    </div>
  )
};