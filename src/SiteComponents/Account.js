import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import * as ROUTES from '../constants/routes';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose'
import { isCompositeComponent } from 'react-dom/test-utils';


class AccountPageBase extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      changeInProgress: false,
      newDisplayName: ''
    }

    this.handleDisplayNameChange = this.handleDisplayNameChange.bind(this)
    this.submitNewDisplayName = this.submitNewDisplayName.bind(this)
  }

  handleDisplayNameChange (e) {
    console.log(document.getElementById('displayName'))
    
    this.setState( (state, props) => ({
      changeInProgress: !state.changeInProgress
    }))

    this.props.firebase.doUpdateDisplayName()
    document.getElementById('displayName').value = this.props.authUser.displayName
    console.log(this.props)
  }

  submitNewDisplayName (e) {
    console.log(document.getElementById('newDisplayName').value)
    const newName = document.getElementById('newDisplayName').value
    
    this.setState( (state, props) => ({
      changeInProgress: !state.changeInProgress,
      newDisplayName: newName
    }))

    this.props.firebase.doUpdateDisplayName(this.state.newDisplayName)
  }

  componentWillUpdate(nextProps, nextState) {

  }

  render() {

    const userEmail = this.props.authUser ? this.props.authUser.email : "Please sign in"
    const displayName = this.props.authUser ? this.props.authUser.displayName : "Please sign in"
    return (
      <div id="account-page">
        <h1>Account</h1>
        <div id="display-name-container">
          <h3 id='displayName'>Display name:&nbsp;</h3>{this.state.changeInProgress ? <input id='newDisplayName' placeholder='new display name'></input> : <h3>{displayName}&nbsp;</h3>}
          { this.state.changeInProgress ?
            <button className="submit-update-btn" onClick={this.submitNewDisplayName}>Save</button> :
            <button className="update-field-btn" onClick={this.handleDisplayNameChange}>change display name</button> 
          }
        </div>
        <h4>{`Email: ${userEmail}`}</h4>
      </div>
    )
  }

}

export const AccountPage = compose(
  withRouter,
  withFirebase,
)(AccountPageBase);

