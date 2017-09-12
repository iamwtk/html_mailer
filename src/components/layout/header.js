import React from 'react'
import { 
  Link
} from 'react-router-dom'
import Layout from '../../pages/layout'
import UserNav from './user-nav'


class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            userNav: false
        }
        
        this.userNavToggle = this.userNavToggle.bind(this);
    }
    
    userNavToggle() {
        this.setState({userNav: !this.state.userNav})
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
                        <button id="notifications"><i className="fa fa-bell-o"></i></button>
                        <button 
                            id="user-profile"
                            className={this.state.userNav ? 'active' : null}
                            onClick={this.userNavToggle}>
                            <i className="fa fa-user-o"></i>
                        </button>
                    </div> 

                </header>
                {this.state.userNav ? <UserNav click={this.userNavToggle}/> : null}
            </div>    
        )
    }
    
}

export default Header;




