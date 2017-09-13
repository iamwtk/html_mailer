import React from 'react'



class SingleEmail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            msgOpen: false,
            msgContent: this.props.html
        }
        this.handleMsgOpen = this.handleMsgOpen.bind(this)
    } 
    handleMsgOpen() {
        this.setState({msgOpen: !this.state.msgOpen})       
    }
    render() {
        const months = ['Jan.',
                        'Feb.',
                        'Mar.',
                        'Apr.',
                        'May',
                        'Jun.',
                        'Jul.',
                        'Aug.',
                        'Sept.',
                        'Oct',
                        'Nov.',
                        'Dec.'],
              dateObj   = new Date(this.props.date),             
              dateYear  = dateObj.getFullYear(),
              dateMonth = months[dateObj.getMonth()],
              dateDay   = dateObj.getDate()     
        
        
        
        
        
        return(
            <li className="single-email">
                <i className={this.props.read ? "fa fa-circle read" : "fa fa-circle unread"}></i>
                
                <span className="date">{`${dateDay} ${dateMonth} ${dateYear}`}</span>
                <span className="to">To: <strong>{this.props.to}</strong></span>
                <span className="subject">Subject: <strong>{this.props.subject}</strong></span>
                <button onClick={this.handleMsgOpen}>view message <i className="fa fa-eye"></i></button>{this.state.msgOpen ? <div dangerouslySetInnerHTML={{ __html: this.state.msgContent }}></div> : null}      
                
                        
            </li>
        )
    }
}
   
      
       

export default SingleEmail