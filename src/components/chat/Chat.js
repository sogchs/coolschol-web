import React, { Component } from 'react';
import { withAuthConsumer } from '../../contexts/AuthStore';
import Conversation from './Conversation';
import { Button } from 'react-bootstrap';
import chatService from '../../services/chat-service';


class Chat extends Component {
  state = {
    users: this.props.classroom.students, //tienes que hacer la condicion de que te pinte los students si eres teacher o el teacher si eres student
    messages:[],
    showConversation: true,
    showInbox: false,
    selected: ''
  }

  handleShowConversation = () => {
    this.setState({
      showInbox: true,
      showConversation: false

    })
  }

  listMessages = (user) => {
    chatService.listMessages(this.props.user.id, user.id)
    .then(message => this.setState({
      messages: message,
      selected: user
    }))
    .then(this.handleShowConversation)
  }

  handleHideConversation = () => {
    this.setState({
      messages: [],
      selected: '',
      showConversation: true,
      showInbox: false
    });
  }



  render() {
    
    return(
      <div>
          <div className="inbox" hidden={this.state.showInbox}>
          {this.state.users.map(user => (
            <Button 
              className="btn inbox-btn" 
              key={user.id} 
              onClick={() => this.listMessages(user)}
            >
            <div className="d-flex flex-row align-items-center">
              <img className="inbox-btn-img" src={user.imageURL} alt="user-avatar"/>
              <p className="mb-0 ml-3">{user.name} {user.surname}</p>
            </div> 
            </Button>
          ))}
          </div>
          <div className="" hidden={this.state.showConversation}>
            <Conversation 
            {...this.state.selected} 
            hideConversation={this.handleHideConversation}
            localUser={this.props.user}
            messages={this.state.messages}
            />
          </div>
      </div>
    )
  }
}

export default withAuthConsumer(Chat);