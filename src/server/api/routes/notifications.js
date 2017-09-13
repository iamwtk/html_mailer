import * as notifications from '../controllers/notifications'

export default function (app, isLoggedIn) {
    
    //tracking email via tracking pixel
    app.get('/api/notifications', (req, res) => {
        notifications.getNotifications(req,res)
    })
    
    //get email list
    app.get('/api/notifications/u', isLoggedIn, (req, res) => {
        notifications.markAsRead(req,res)
    })

}