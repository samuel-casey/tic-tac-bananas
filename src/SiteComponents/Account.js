import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import * as ROUTES from '../constants/routes';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose'
import { isCompositeComponent } from 'react-dom/test-utils';


class AccountPageBase extends React.Component {
  constructor(props) {
    super(props)

    const INITIAL_STATE = {
      changeInProgress: false,
      newDisplayName: ''
    }

    this.state = { ...INITIAL_STATE}

    this.showInput = this.showInput.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onNameChange = this.onNameChange.bind(this)

    
  }

  showInput = event => {
    console.log(document.getElementById('displayName'))
    
    this.setState( (state, props) => ({
      changeInProgress: !state.changeInProgress
    }))

    this.props.firebase.doUpdateDisplayName()
    document.getElementById('displayName').value = this.props.authUser.displayName
    console.log(this.state)
  }

  onSubmit = event => {
    const newName = document.getElementById('newDisplayName').value

    this.props.firebase
      .doUpdateDisplayName(newName)
      .then( () => {
        this.setState((state,props) => ({
          changeInProgress: !state.changeInProgress
        }))
      })
      .catch(error => console.log(error))
    
    event.preventDefault();
  };

  onNameChange = e => {
    this.setState({ [e.target.name]: e.target.value });
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
          <h3 id='displayName'>Display name:&nbsp;</h3>{this.state.changeInProgress ? <input id='newDisplayName' name='newDisplayName' placeholder='new display name' onChange={this.onNameChange}></input> : <h3>{displayName}&nbsp;</h3>}
          { this.state.changeInProgress ?
            <button className="submit-update-btn" onClick={this.onSubmit}>Save</button> :
            <button className="update-field-btn" onClick={this.showInput}>change display name</button> 
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

