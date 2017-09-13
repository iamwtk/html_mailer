import React from 'react'
import { Route } from 'react-router-dom'
import NewEmail from '../../pages/new-email'
import EmailHistory from '../../pages/email-history'
import Dashboard from '../../pages/dashboard'

const Content = () => (
    <div id="content">
       <Route exact path="/app" component={Dashboard}/>
       <Route exact path="/app/email/new" component={NewEmail}/>
       <Route exact path="/app/email/history" component={EmailHistory}/>
    </div>
)

export default Content




