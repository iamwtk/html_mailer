import React from 'react'

import SingleEmail from './single-email'

class EmailList extends React.Component {
    render() {
        const list = this.props.list;
        console.log(list)
        return(
            
            <ul className="email-list">
                {
                    list.map((email) => 
                    <SingleEmail
                        to={email.to}    
                        from={email.from}    
                        html={email.html}    
                        status={email.status}
                        key={email._id}
                    />
                )
                    }
            </ul> 
        )
    }
}    
      
     


export default EmailList