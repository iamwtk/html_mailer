import React from 'react'
import Notification from './notification'



class Notifications extends React.Component {
    
    
    
    render() {
        const notifData = this.props.data
        return(
            <ul id="notif-window">
                  {notifData.map(notif =>
                    <Notification
                        to={notif.to}
                        subject={notif.subject}
                        date={notif.date}
                        passkey={notif._id}
                        unread={notif.unread}/>
                                
                    )}
            </ul>
        )
    }
}


export default Notifications