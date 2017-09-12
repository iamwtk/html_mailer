import * as dashboard from '../controllers/dashboard'


export default function (app, isLoggedIn) {   
  
    app.get('/api/dashboard', isLoggedIn, (req, res) => { 
        dashboard.getStatistics(req,res) 
    })
    
    
}