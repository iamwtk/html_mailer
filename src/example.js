
export default function (app, passport, isLoggedIn) {
    //Root domain - check if user is logged in if yes, redirect to react app, if not render index 
    app.get('/', (req, res) => {        
        req.isAuthenticated() ? 
            res.redirect('/app') : res.render('index')
    } );    
    // if user is logged in renders app view where React takes over the routing inside application
    app.get('/app*', isLoggedIn, (req, res) => res.render('app')) 
    
    //logsout user and redirects to root
    app.get('/logout', (req, res) => {        
        req.logout()
        res.redirect('/') 
    });
    
    //passport user signup
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/app',
        failureRedirect : '/', 
        failureFlash : true 
    }));
    //passport user login
     app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/app', 
        failureRedirect : '/', 
        failureFlash : true 
    }));

}