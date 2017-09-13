import React from 'react'



class Notification extends React.Component {
    constructor() {
        super()
        this.convertDate = this.convertDate.bind(this)
    }
    
    convertDate(date) {
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
              dateObj   = new Date(date),
              dateSec   = dateObj.getTime(),
              dateYear  = dateObj.getFullYear(),
              dateMonth = months[dateObj.getMonth()],
              dateDay   = dateObj.getDate(),
              nowSec    = new Date().getTime(),
              seconds   = Math.floor((nowSec - dateSec) / 1000)
        let   interval  = Math.floor(seconds / 2592000);
        
        if (interval >= 1)
            return `${dateDay} ${dateMonth} ${dateYear}`
            
        
        interval = Math.floor(seconds / 86400)
        console.log(interval)
        if (interval >= 1)
            return `${interval} day(s) ago`
            
        interval = Math.floor(seconds / 3600)
        console.log(interval)
        if (interval >= 1)
            return `${interval} hour(s) ago`
            
        interval = Math.floor(seconds / 60)
        console.log(interval)
        if (interval >= 1)
            return `${interval} minute(s) ago`
        
        return 'just now'
    }
    
    render() {
        const notifData = this.props.data
        return(
            <li key={this.props.passkey}>
                <div className={this.props.unread ? 'notif-single unread' : 'notif-single'}>
                    <p>
                    <strong>{this.props.to}</strong> read your email: <strong className="subject">"{this.props.subject}"</strong>
                    <span className="date">{this.convertDate(this.props.date)}</span>
                    
                    </p>
                </div>
            </li>
            
        )
    }
}


export default Notification