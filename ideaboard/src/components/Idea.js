import React, { Component } from 'react'

class Idea extends Component {
  handleClick = () => { this.props.onClick(this.props.idea.id) }

  handleDelete = () => { this.props.onDelete(this.props.idea.id) }

  render() {
    const { title, body } = this.props.idea

    return (
      <div className="tile">
        <span className="deleteButton" onClick={this.handleDelete}>x</span>
        <h4 onClick={this.handleClick}>{title}</h4>
        <p onClick={this.handleClick}>{body}</p>
      </div>
    )
  }
}

export default Idea