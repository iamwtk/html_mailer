import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Header from '../components/layout/header'
import Content from '../components/layout/content'
import Navigation from '../components/layout/navigation'

class Layout extends React.Component {
    
    constructor(props) {
        super(props);
        this.state= {
            toggleNav: false
        };
        this.handleToggleNav = this.handleToggleNav.bind(this);
    }
    
    
    
    handleToggleNav() {
        this.setState({
            toggleNav: !this.state.toggleNav
        })
    }
    
    render() {
        return(
        <div>            
            <Header
                handleToggleNav={this.handleToggleNav}
                toggleNav = {this.state.toggleNav}
            />
            <div id="page">
                <Navigation 
                    toggleNavState={this.state.toggleNav}
                    toggleNav={this.handleToggleNav}
                />            
                <Content/>                
                                
            </div>
        </div> 
        )
        
    }
    
} 
           

export default Layout