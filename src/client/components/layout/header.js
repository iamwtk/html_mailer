import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Layout from '../../pages/layout'
import UserNav from './user-nav'
import Notifications from './notifications'


class Header extends React.Component {
    constructor() {
        super()
        this.state = {
            userNav: false,
            notifToggle: false,
            notifData: [],
            notifNew: 0
        }
        this.userNavToggle = this.userNavToggle.bind(this)
        this.notificationsToggle = this.notificationsToggle.bind(this)
        this.getNotifications = this.getNotifications.bind(this)
        this.newNotifications = this.newNotifications.bind(this)
        
    }
    
    //Get notifications
    getNotifications() {
        axios.get('/api/notifications')
        .then((result)=> {        
          const thisData = result.data
          this.setState({
            notifData: thisData
          }) 
        })
        this.setState({notifNew: 0})
        this.newNotifications(this.state.notifData)
    }
    
    
    
    newNotifications(data) {
        data.map((notif) => {
            if (notif.unread) {
                this.setState({notifNew: this.state.notifNew + 1})
            }
                
        })
    }
        
    //call api fetch every 30s
    componentDidMount() {        
        this.interval = setInterval(this.getNotifications, 3000) 
    }
    //clear interval on unmount
    componentWillUnmount() {
        clearInterval(this.interval)
    }
    
    userNavToggle() {
        this.setState({userNav: !this.state.userNav})
        this.setState({notifToggle: false})
    }
    
    notificationsToggle() {
        this.setState({notifToggle: !this.state.notifToggle})
        this.setState({userNav: false})
        //mark as read after opening notifications
        if(!this.state.notifToggle)
            axios.get('/api/notifications/u')
        
    }
  
   
    render() {
        return(
            <div>
                <header className="site-header">       
                    <div className="logo-wrap">
                        <Link to="/app"><span className="logo">HTML<span className="thin">Mailer</span></span></Link>
                    </div>
                    <div className="buttons-wrap">
                        <button
                            id="main-nav"
                            className={this.props.toggleNav ? 'active' : null}
                            onClick={this.props.handleToggleNav}>       <i className="fa fa-bars"></i>
                        </button>
                        <button id="notifications"
                            className={this.state.notifToggle ? 'active' : null}
                            onClick={this.notificationsToggle}>
                            <i className="fa fa-bell-o"></i>
                            {this.state.notifNew > 0 ? <span className="new-notif">{this.state.notifNew}</span> : null}
                        </button>
                        <button 
                            id="user-profile"
                            className={this.state.userNav ? 'active' : null}
                            onClick={this.userNavToggle}>
                            <i className="fa fa-user-o"></i>
                        </button>
                    </div> 

                </header>
                {this.state.userNav ? <UserNav click={this.userNavToggle}/> : null}
                
                {this.state.notifToggle ? <Notifications data={this.state.notifData}/> : null}
            </div>    
        )
    }
    
}

export default Header




