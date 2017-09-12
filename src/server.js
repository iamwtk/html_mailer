/***************************************
MODULES IMPORT ************************/
import path from 'path';
import Express from 'express';
import { Server } from 'http';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import passport from 'passport';
import flash from 'connect-flash';
import session from 'express-session';
import mongoose from 'mongoose';
import morgan from 'morgan';
import dbConfig from './config/database';
import bodyParser from 'body-parser';
import routes from './api/routes/';
import controllers from './api/controllers/';
import nodemailer from 'nodemailer';



const app = new Express(),
      server = new Server(app);

/***************************************
DATABASE CONNECTION *******************/
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, (err) => 
                 console.info( err ? `There was error connecting to databse: ${err}` : 'Connected to database'));
mongoose.set('debug', true);


//**************************************
 
controllers(passport); // pass passport for configuration



app.use(morgan('dev')); //Console logging each request
app.use(Express.static(path.join(__dirname, 'static'))); //Serves static files from folder static
app.use(bodyParser.urlencoded({ extended: true })); //Parsing urlencoded res
app.use(bodyParser.json()); //Parsing json res
app.set('view engine', 'ejs'); //template engine 
app.set('views', path.join(__dirname, 'views')); //template folder views


app.use(session({ 
    secret: 'usidhfasdfas6df46as54df6a5sd4f', 
    resave: true, 
    saveUninitialized: true 
})); 
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions      
app.use(flash()); // use connect-flash for flash messages stored in session


routes(app,passport);


/******************************************
SERVER ***********************************/
const port = process.env.PORT || 8080;
server.listen(port, (err) => {
    err ? console.error(err) : console.log(`Server is running on localhost:${port}`) 
});

