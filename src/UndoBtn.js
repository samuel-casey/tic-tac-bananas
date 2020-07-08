import React from 'react'

class UndoBtn extends React.Component {
    render() {
        return (
            <div className='undo-btn' onClick={() => this.props.onClick()}>{this.props.value}</div>
        )
    }
}


export default UndoBtn 