import * as email from '../controllers/email'

export default function (app, isLoggedIn) {
    
    //send email
    app.post('/api/email', isLoggedIn, (req, res) => {        
        email.sendEmail(req,res)
    })
    
    //tracking email via tracking pixel
    app.get('/api/email/track?:id', (req, res) => {
        email.trackEmail(req,res)
    })
    
    //get email list
    app.get('/api/email', isLoggedIn, (req, res) => {
        email.loadEmails(req,res)
    })
    //delete email id from param
    app.get('/api/email/delete?:id', isLoggedIn, (req,res) => {
        email.deleteEmail(req,res)
    })
}