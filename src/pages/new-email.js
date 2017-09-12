import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import axios from 'axios'



class NewEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      to: '',
      subject: '',
      html: '',
      track: true    
    };   
    this.inputHandler = this.inputHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
    
    inputHandler(e) {
      const target = e.target,   
            track = target.type === 'checkbox' ? target.checked : target.value,
            name = target.name;
      

    this.setState({
      [name]: target.value
    });
  }
    handleSubmit(e) {
        axios.post('/api/email', {            
            to: this.state.to,
            subject: this.state.subject,
            html: this.state.html,
            track: this.state.track,
            
          })
          .then(function (response) {
            alert('sent');
          })
          .catch(function (err) {
            alert(err)
          });
        e.preventDefault();
  }
    

  
    


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
         To:
          <input
            name="to"
            type="email"
            value={this.state.to}
            onChange={this.inputHandler}
             />
        </label>
        <br />
        <label>
         Subject:
          <input
            name="subject"
            type="text"
            value={this.state.subject}
            onChange={this.inputHandler}
           />
        </label>
        <br />    
        <label>
         To:
          <textarea
            name="html" 
              value={this.state.html}
              onChange={this.inputHandler}
              />
        </label>
        <br />    
        <label>
          Track email?hhh:
          <input
            name="track"
            type="checkbox"
            checked={this.state.track}
              onChange={this.inputHandler}
             />
        </label> 
        <br />
        <input type="submit" value="Send" />
      </form>
    );
  }

}
export default NewEmail;
