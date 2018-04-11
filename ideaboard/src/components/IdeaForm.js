import React, { Component } from 'react'
import axios from 'axios'

class IdeaForm extends Component {
  constructor(props) {
    super(props)
    const { idea } = this.props

    this.state = {
      title: idea.title,
      body: idea.body
    }
  }

  handleInput = (e) => {
    this.props.resetNotification()
    this.setState({[e.target.name]: e.target.value})
  }

  handleBlur = () => {
    const { title, body } = this.state
    const { id } = this.props.idea
    const { updateIdea } = this.props
    const idea = { title, body }

    axios.put(
      `http://localhost:3001/api/v1/ideas/${id}`,
      { idea }
    ).then(response => {
      updateIdea(response.data)
    }).catch(error => console.log(error))
  }

  render() {
    const { title, body } = this.state

    return (
      <div className="tile">
        <form onBlur={this.handleBlur}>
          <input className="input" type="text" name="title"
            placeholder="Enter a Title"
            value={title}
            onChange={this.handleInput}
            ref={this.props.titleRef} />
          <textarea className="input" name="body"
            placeholder="Describe your idea"
            value={body}
            onChange={this.handleInput}></textarea>
        </form>
      </div>
    )
  }
}

export default IdeaForm