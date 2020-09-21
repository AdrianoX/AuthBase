const express = require('express');
const cors = require('cors');
const path = require('path');
const hbs = require('express-handlebars');

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');

const app = express();

// configure passport provider options
passport.use(new GoogleStrategy({
    clientID: '393396406885-1s3f08vovfi07ftqjplddui5bfpsaqo5.apps.googleusercontent.com',
    clientSecret: 'nktEifna3HXSh6cQ1LRbA1QO',
    callbackURL: 'http://localhost:8000/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    done(null, profile);
}));

// serialize user when saving to session
passport.serializeUser((user, serialize) => {
    serialize(null, user);
});

// deserialize user when reading from session
passport.deserializeUser((obj, deserialize) => {
    deserialize(null, obj);
});

app.use(session({ secret: 'anything' }));
app.use(passport.initialize());
app.use(passport.session());

app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' }));
app.set('view engine', '.hbs');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }));

  app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/user/no-permission' }),
  (req, res) => {

    res.redirect('/user/logged');
  } 
);


app.get('/', (req, res) => {
    res.render('index');
});

app.get('/user/logged', (req, res) => {
    res.render('logged');
});

app.get('/user/no-permission', (req, res) => {
    res.render('noPermission');
});

app.use('/', (req, res) => {
    res.status(404).render('notFound');
});

app.listen('8000', () => {
    console.log('Server is running on port: 8000');
});
