import React, { Component } from 'react'

class Sort extends Component {
  handleChange = (e) => {
    this.props.onChange(e.target.value)
  }

  render() {
    const { sortBy } = this.props

    return (
      <span>
        Sort ideas by:
        <select name="sort" value={sortBy} onChange={this.handleChange}>
          <option value="createdAt">Date created</option>
          <option value="title">Title</option>
          <option value="body">Body</option>
        </select>
      </span>
    )
  }
}

export default Sort