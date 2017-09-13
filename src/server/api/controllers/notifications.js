import mongoose from 'mongoose'
import User from '../models/user'



export function getNotifications(req, res) {
    
    User.findById(req.user._id)
        .catch(err => { throw err })
        .then(result => res.json(result.notifications.slice(0,10)))
    
}


export function markAsRead(req, res) {
    
    User.findOne({_id: req.user._id})
        .catch(err => {
            throw err
        })
        .then((user) => {
        user.notifications.map(notif => {
            notif.unread ? (
            User.findOneAndUpdate(
                {_id: req.user._id, 'notifications._id': notif._id}, 
                { $set:  { 'notifications.$.unread': false }})
                .catch(err => { throw err })
                .then(() => res.status(200))
            ) : null
        })
        
    })

}
