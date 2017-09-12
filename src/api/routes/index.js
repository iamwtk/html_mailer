import auth from './auth'
import email from './email'
import dashboard from './dashboard'


export default function (app,passport) {
    auth(app,passport,isLoggedIn) 
    email(app,isLoggedIn) 
    dashboard(app,isLoggedIn)
    
    function isLoggedIn(req, res, next) {
        req.isAuthenticated() ?
            next() : res.redirect('/')
    }
}