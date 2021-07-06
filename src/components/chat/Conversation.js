import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import chatService from '../../services/chat-service';

const validations = {
  content: (value) => {
  let message;
  if(!value){
    message = 'Some message is required'
  }
  return message;
}}

class Conversation extends Component {

  state = {
    message: {
      content: '',
      recipient:'',
      sender:''
    },
    errors: {
      content: validations.content()
    },
    touch: {},
    liveMessages: []
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      message: {
        ...this.state.message,
        [name]: value,
        recipient: this.props.id,
        sender: this.props.localUser.id
      },
      errors: {
        ...this.state.errors,
        [name]: validations[name] && validations[name](value)
      }
    })
  }
  handleBLur = (event) => {
    const { name } = event.target;
  
    this.setState({
      ...this.state.touch,
      [name]: true
    })
    
  }


  createMessage = (event) =>{
    event.preventDefault();
    this.setState({liveMessages:[...this.state.liveMessages, this.state.message.content]})
    
    chatService.createMessage(this.state.message)
    .then(this.setState({message:{content:''}}))

  }

  render() {

    return (
      <div className="body-conversation">
        <div className="server-card">
          <Button onClick={this.props.hideConversation} className="btn-back"><i className="fas fa-arrow-left"></i></Button>
          <img src={this.props.imageURL} alt=""/>
          <p>{this.props.name} {this.props.surname}</p>
          
        </div>
        <div className="chat">
          <div className="conversation">
            <div className="container-conversation">
              {this.props.messages.map(message => (
              <div key={message.id} className={` ${message.recipient === this.props.id ? 'message-r' : 'message-s'} `}>
                  {message.content}
              </div>
              ))}
              {this.state.liveMessages.map(content => (
              <div key={content} className="message-r">
                  {content}
              </div>
              ))}
          </div>
          </div>
          <form className="write" onSubmit={this.createMessage}>
              <div className="input-group mb-3">
                  <input type="text" 
                  className={`form-control form-control-sm ${this.state.touch.conversation ? (this.state.errors.conversation ? 'is-invalid' : 'is-valid') : ''}`} 
                  name="content"
                  value={this.state.message.content}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  autoComplete="off"
                  />
                  <div className="invalid-feedback">{this.state.errors.content}</div>
                  <div className="input-group-append">
                      <button className="btn btn-outline-info" type="submit"><i className="fas fa-rocket"></i></button>
                  </div>
              </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Conversation ;