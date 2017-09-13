import React from 'react'
import axios from 'axios'



class NewEmail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      to: '',
      subject: '',
      html: '',
      track: true,
      htmlEditor: false
    };  
    this.inputHandler = this.inputHandler.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.switchToPreview = this.switchToPreview.bind(this)
    this.switchToText = this.switchToText.bind(this)
  }
    
    inputHandler(e) {
      const target = e.target,   
            track = target.type === 'checkbox' ? target.checked : target.value,
            name = target.name;
      

    this.setState({
      [name]: target.value
    })
  }
    handleSubmit(e) {
        
        axios.post('/api/email', {            
            to: this.state.to,
            subject: this.state.subject,
            html: this.state.html,
            track: this.state.track,
            
          })
          .then(function (response) {
            alert('Email successfully sent!');
          })
          .catch(function (err) {
            alert(err)
          })
        e.preventDefault()
  }
    
    switchToText() {
        this.setState({htmlEditor: false})
    }
    switchToPreview() {
        document.getElementById("html-editor").innerHTML = this.state.html
        this.setState({htmlEditor: true})
    }

  
    


  render() {
    return (
    <div id="email-editor" className={this.state.htmlEditor ? 'html' : 'text'}>
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
            <label>To:</label>
            <input
                name="to"
                type="email"
                value={this.state.to}
                onChange={this.inputHandler}
             />
        </div>
        <div className="form-group">
            <label>Subject:</label>
                <input
                name="subject"
                type="text"
                value={this.state.subject}
                onChange={this.inputHandler}
               />
        </div>   
        <div className="top-bar">
            <button 
                onClick={this.switchToText}
                type="button"
                id="btn-text"
                >
                <i className="fa fa-code"></i>
                
                Code
            </button>
            <button 
                id="btn-html"
                onClick={this.switchToPreview}
                type="button"
                >
                <i className="fa fa-eye"></i>
                Preview
            </button>
            <div className="form-group-check">
                <label>Track email?</label>
                <input
                name="track"
                type="checkbox"
                checked={this.state.track}
                  onChange={this.inputHandler}
                 />
            </div>            
            <button id="btn-send" type="submit">
                <i className="fa fa-envelope-o"></i>
                &nbsp;Send
            </button>
        </div>
        <div className="text-editor-wrap">
          <textarea
            name="html" 
              value={this.state.html}
              onChange={this.inputHandler}/>
        </div>
          <div id="html-editor"></div>
      </form>
    </div>    
    );
  }

}
export default NewEmail
