import React from 'react'

class Box extends React.Component {
    
    render() {
      return (
        <button
        fromturn={this.props.turnNumber}
        className={this.props.className}
        onClick={ () => {this.props.onClick()}}>
          {this.props.value}
        </button>
      );
    }
  }

export default Box