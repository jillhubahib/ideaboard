import React, { Component } from 'react'
import axios from 'axios'
import Idea from './Idea'
import IdeaForm from './IdeaForm'
import Notification from './Notification'
import Sort from './Sort'

class IdeasContainer extends Component {
  state = {
    ideas: [],
    editingIdeaId: null,
    notification: '',
    transitionIn: false,
    sortBy: 'createdAt'
  }

  componentDidMount() {
    this.fetchIdeas()
  }

  fetchIdeas = () => {
    axios.get('http://localhost:3001/api/v1/ideas', {
      params: {
        sort_by: this.state.sortBy
      }
    })
    .then(response => {
      this.setState({ideas: response.data})
    })
    .catch(error => console.log(error))
  }

  addNewIdea = () => {
    axios.post('http://localhost:3001/api/v1/ideas', {idea: {title: '', body: ''}})
    .then(response => {
      this.setState({
        ideas: [response.data, ...this.state.ideas],
        editingIdeaId: response.data.id
      })
    })
    .catch(error => console.log(error))
  }

  updateIdea = (idea) => {
    const { ideas } = this.state
    this.setState({
      ideas: ideas.map(x => x.id === idea.id ? idea : x),
      notification: 'All changes saved',
      transitionIn: true
    })
  }

  deleteIdea = (id) => {
    axios.delete(`http://localhost:3001/api/v1/ideas/${id}`)
    .then(response => {
      this.setState({
        ideas: this.state.ideas.filter(x => x.id !== id)
      })
    }).catch(error => console.log(error))
  }

  resetNotification = () => {this.setState({notification: '', transitionIn: false})}

  enableEditing = (id) => {
    this.setState({editingIdeaId: id}, () => { this.title.focus() })
  }

  changeSort = (value) => {
    this.setState({sortBy: value}, () => this.fetchIdeas())
  }

  render() {
    const { ideas, editingIdeaId, notification, transitionIn, sortBy } = this.state

    return (
      <div>
        <div>
          <button className="newIdeaButton" onClick={this.addNewIdea} >
            New Idea
          </button>
          <Sort sortBy={sortBy} onChange={this.changeSort} />
          <Notification in={transitionIn} notification={notification} />
        </div>
        {ideas.map(idea => {
          if(editingIdeaId === idea.id) {
            return (<IdeaForm key={idea.id} idea={idea}
                      titleRef={input => this.title = input}
                      updateIdea={this.updateIdea}
                      resetNotification={this.resetNotification} />)
          } else {
            return (<Idea key={idea.id} idea={idea}
                      onClick={this.enableEditing}
                      onDelete={this.deleteIdea} />)
          }
        })}
      </div>
    );
  }
}

export default IdeasContainer;