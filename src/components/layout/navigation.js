import React from 'react'
import NavItem from './navitem'


class Navigation extends React.Component {    
    
    render() {
        const links = [
            {
                to: '/app',
                icon: 'dashboard',
                text: 'Dashboard',
                exact: true
            },
             {
                to: '/app/email/new',
                icon: 'envelope-open',
                text: 'New Email',
                exact: false
                 
            },
            {
                to: '/app/email/history',
                icon: 'history',
                text: 'History',
                exact: false
            },
        ]        
      
       return (           
             <nav className={"main-nav " + (this.props.toggleNavState ? 'active' : 'hidden')}> 
                <ul>
                    {links.map((link) => 
                    <li key={link.text}>                        
                        <NavItem
                            to={link.to}
                            icon={link.icon}
                            text={link.text}
                            exact={link.exact}
                            click={this.props.toggleNav}
                        />    
                    </li>          
                    )} 
              </ul>
            </nav>
        )
    }        
}

export default Navigation;




