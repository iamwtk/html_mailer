import { Strategy as LocalStrategy } from 'passport-local'
import User from '../models/user'



export default function (passport) {
    

    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser( (id, done) => {
        User.findById(id, (err, user) => { done(err, user) })
    })
    
    //Signup
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, done) => {
        process.nextTick(() => {
            User.findOne({
                'login.local.email': email
            }, (err, user) => {
                err ? done(err) : null
                if (user)
                    return done(null, false, req.flash('signupError', 'User already exists.'))
                else {
                    const newUser = new User()

                    newUser.login.local.email = email
                    newUser.login.local.password = newUser.generateHash(password)

                    newUser.save()
                        .catch((err) => { throw err })
                        .then(() => done(null, newUser, req.flash('signupSuccess', 'Signup successful, redirecting...')))
                }
            })
        })
    }))
    
   
    //Login
    passport.use('local-login', new LocalStrategy({
       
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true 
    },
    (req, email, password, done) => { 
        User.findOne({ 'login.local.email' :  email }, (err, user) => { 
            
            err ? done(err) : null

            if (!user)
                return done(null, false, req.flash('loginError', 'No user found.')) 

            if (!user.validPassword(password))
                return done(null, false, req.flash('loginError', 'Wrong password.')) 
            
            return done(null, user, req.flash('loginSuccess', 'Login successful, redirecting...'))
        })

    }))



}




