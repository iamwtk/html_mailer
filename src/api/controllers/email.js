import path from 'path';
import mongoose from 'mongoose';
import Email from '../models/email';
import nodemailer from 'nodemailer';

export function sendEmail(req, res) {
    
    //SMTP Settings
    const transporter = nodemailer.createTransport({
        host: 'smtp.mailgun.org',
        port: '465',
        secure: true,
        auth: {
            user: 'postmaster@mg.jarmill.com',
            pass: '93d3891f4b9e4f99535721876e91ed78'
        }
    });
    //Tracking pixel
    
    //options for nodemailer
    const sendOptions = {
        from: req.user.login.local.email, 
        to: req.body.to,
        subject: req.body.subject, 
        html: req.body.html 
    };
    
    if (req.body.track) {
        
    }
    //model to save in database
    const saveMail = new Email(sendOptions);
    saveMail.owner = req.user._id;
    saveMail.date = new Date();



    


    saveMail.save((err, email) => {
        if (err) {
            throw err;
        } else {
            const trackPix = `<img src="${req.protocol}://${req.get('host')}${req.originalUrl}/track?id=${email._id}" width="1" height="1">`;
            
            if (req.body.track) {
                sendOptions.html = `${req.body.html} <br/> ${trackPix}`;
            }
            
            
            transporter.sendMail(sendOptions, (err, info) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    return res.status(200).json({
                        success: info
                    });
                }

    });
        }
        
    });

}

export function trackEmail(req, res) {
    //Load mailid from url query
    const id = req.query.id,
        status = {
            read: true
        }


    Email.findOneAndUpdate({_id: id}, status, {new: true}, (err, email) => {
        if (err) {
            return res.status(500).json({error: err});
        } else {
            return res.sendFile(path.join(__dirname, '../../static', 'track.png'));
        }
            
        
    });



    
}

export function loadEmails(req, res) {
    
    Email.find({owner: req.user._id}, (err, emails) => {
        if (err) {            
            return res.status(500).json({error: err});
        } else {
            return res.status(200).json(emails);
        }
    });
}

export function deleteEmail(req, res) {
    //get id 
    Email.findOne({_id: req.query.id}, (err, email) => {
        if (err) {
            return res.status(500).json({error: err});
        } else {            
            if (email.owner.toString() == req.user._id.toString()) {
                Email.remove({_id: req.query.id}, (err) => {
                    if (err) {
                        return res.status(500).json({error: err});
                    } else {
                        return res.status(200).json({success: 'Email deleted!'});
                    }
                })
            } else {
                return res.status(500).json({error: 'Not your email!'});
            }
        }
    });
    
}