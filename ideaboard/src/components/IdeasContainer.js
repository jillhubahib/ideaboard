import React, { Component } from 'react'
import axios from 'axios'
import Idea from './Idea'

class IdeasContainer extends Component {
  state = {
    ideas: []
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/ideas.json')
    .then(response => {
      this.setState({ideas: response.data})
    })
    .catch(error => console.log(error))
  }

  render() {
    const { ideas } = this.state;
    return (
    <div>
      <div>
        <button className="newIdeaButton">
          New Idea
        </button>
      </div>
      {ideas.map(idea => {
        return <Idea key={idea.id} idea={idea} />
      })}
    </div>
    );
  }
}

export default IdeasContainer;