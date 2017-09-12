import React from 'react'
import { 
  Link
} from 'react-router-dom'


class UserNav extends React.Component {
    render() {
        const links = [
            {
                to: '/app',
                icon: 'user-o',
                text: 'Profile',
                Link: true
            },
             {
                to: '/logout',
                icon: 'power-off',
                text: 'Logout',
                Link: false
                 
            }
        ] 
        
        
        
        
        return(
            <ul id="user-nav">
                {links.map((link) => 
                    <li key={link.text}>
                               
                        {link.Link ? (
                                   
                        <Link 
                            to={link.to} 
                            onClick={this.props.click}>
                        {link.text} 
                        <i className={`fa fa-${link.icon}`}></i>
                        </Link>           
                        ) : (
                                   
                        <a 
                            href={link.to}>
                        {link.text}
                         <i className={`fa fa-${link.icon}`}></i>
                        </a> 
                                   
                        )}
                               
                               
                    </li>          
                )} 
            </ul>    
        )
    }
}
    
    
    



export default UserNav