
export default function (app, passport, isLoggedIn) {
    //Root domain - check if user is logged in if yes, redirect to react app, if not render index 
    app.get('/', (req, res) => {        
        req.isAuthenticated() ? 
            res.redirect('/app') : res.render('index')
    } );    
    // if user is logged in renders app view where React takes over the routing inside application
    app.get('/app*', isLoggedIn, (req, res) => res.render('app')) 
    
    //logs out user and redirects to root
    app.get('/logout', (req, res) => {        
        req.logout()
        res.redirect('/') 
    });
    
    //passport user signup
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/api/signup/success',
        failureRedirect : '/api/signup/failure', 
        failureFlash : true 
    }))
    
    app.get('/api/signup/success', (req, res) => 
           res.json({success: true, message: req.flash('signupSuccess')[0]}))
    
    app.get('/api/signup/failure', (req, res) => 
           res.json({success: false, message: req.flash('signupError')[0]}))
    
    
    
    //passport user login
     app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/api/login/success', 
        failureRedirect : '/api/login/failure', 
        failureFlash : true 
    }))
    
    app.get('/api/login/success', (req, res) => 
           res.json({success: true, message: req.flash('loginSuccess')[0]}))
    
    app.get('/api/login/failure', (req, res) => 
           res.json({success: false, message: req.flash('loginError')[0]}))

}