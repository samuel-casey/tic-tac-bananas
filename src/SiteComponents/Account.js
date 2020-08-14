import React from 'react';

export const Account = (props) => {
  const userEmail = props.authUser ? props.authUser.email : "Please sign in"
  const displayName = props.authUser ? props.authUser.displayName : "Please sign in"
  return (
    <div id="account-page">
      <h1>Account</h1>
      <h3>{`Display name: ${displayName}`}</h3>
      <h4>{`Email: ${userEmail}`}</h4>
    </div>
  )
};