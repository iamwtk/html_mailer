leimport path from 'path'
import mongoose from 'mongoose'
import Email from '../models/email'
import User from '../models/user'
import nodemailer from 'nodemailer'


//SEND EMAIL
export function sendEmail(req, res) {

    //SMTP Settings
    const transporter = nodemailer.createTransport({
        host: 'smtp.mailgun.org',
        port: '465',
        secure: true,
        auth: {
            user: 'example@example.com',
            pass: 'XXXXXXXXXXXXXXXXXXXXXX'
        }
    })
    //options for nodemailer
    const sendOptions = {
        from: req.user.login.local.email,
        to: req.body.to,
        subject: req.body.subject,
        html: req.body.html
    }
    //model to save in database
    const saveMail = new Email(sendOptions)
    saveMail.owner = req.user._id
    saveMail.date = new Date()
    
    //save email
    saveMail.save()
        .catch(err => { throw err })
        .then(email => {
        
            const trackPix = `<img src="${req.protocol}://${req.get('host')}${req.originalUrl}/track?id=${email._id}" width="1" height="1">`

            req.body.track ? sendOptions.html = `${req.body.html} <br/> ${trackPix}` : null
            
            transporter.sendMail(sendOptions)
                .catch(err => res.status(500).json({
                    error: err
                }))
                .then(info => res.status(200).json({
                    success: info
                }))
        })
}

//TRACK EMAIL
export function trackEmail(req, res) {
    //Load mailid from url query
    const   id = req.query.id,
            status = {
                read: true
            }
    //change status to read    
    Email.findOneAndUpdate({_id: id}, status, {new: true})
        .catch(err => res.status(500).json({error: err}))
        .then(() => res.sendFile(path.join(__dirname, '../../static', 'track.png')))
    
    //find owner and save notification
    Email.findById(id)
        .catch(err => { throw err })
        .then(email => {
            
            const notification = {
                date: new Date(),
                to: email.to,
                subject: email.subject,
                unread: true
            }
            
        
            User.findOneAndUpdate(
                {_id: email.owner},
                {$push: { notifications: { $each: [ notification ], $position: 0 }}}, {new: true})
                .catch(err => { throw err })
                .then(() => res.status(200))
        })
    
}

//LOAD EMAILS
export function loadEmails(req, res) {
    Email.find({owner: req.user._id})
        .catch(err => res.status(500).json({error: err}))
        .then(emails => res.status(200).json(emails)) 
}

export function deleteEmail(req, res) {
    //Load mailid from url query
    const id = req.query.id
    
    //Find email with id
    Email.findById(id)
        .catch(err => res.status(500).json({error: err}))
        .then(email => {
            email.owner.toString() === req.user._id.toString() ?
                (Email.remove({_id: id})
                    .catch(err => 
                            res.status(500).json({error: err}))
                    .then(() => 
                            res.status(200).json({success: 'Email deleted!'}))
                ):(
                res.status(500).json({error: 'Not your email!'}))
        })
    
    
}

