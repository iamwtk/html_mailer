import React from 'react'

import SingleEmail from './single-email'

class EmailList extends React.Component {
    render() {
        const list = this.props.list.reverse()        
        return(
            
            <ul className="email-list">
                {
                    list.map((email) => 
                    <SingleEmail
                        to={email.to}    
                        from={email.from}    
                        html={email.html}    
                        subject={email.subject}    
                        read={email.read}
                        date={email.date}
                        id={email._id}
                        key={email._id}
                    />
                )
                    }
            </ul> 
        )
    }
}    
      
     


export default EmailList