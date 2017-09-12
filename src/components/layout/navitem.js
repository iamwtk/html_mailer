import React from 'react'
import { NavLink } from 'react-router-dom'



class NavItem extends React.Component {
    
    render() {
        return(
            <NavLink 
                to={this.props.to} 
                exact={this.props.exact} 
                onClick={this.props.click}>

                <span className="menu-item">
                <i className={`fa fa-${this.props.icon}`}></i>            
                {this.props.text}
                </span>

            </NavLink>
        )
    }
}    
     
    
    
    

export default NavItem;




