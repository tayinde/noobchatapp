const Express = require('express');
const App = Express();
const bodyParser = require('body-parser');
const database = require('./database');
const logo = '/images/logo.png';
const secret = require('./token.js').createToken();
const compression = require('compression');

module.exports =
{
    app:
    {
        App,
        Express,
        bodyParser,
    },
    secret: secret,
    init: () =>
    {
        App.set('view engine', 'pug');
        App.set('views', './resources/views')
        App.use(Express.json({limit: '10kb'}));
        App.use(Express.static('./resources'));
        App.use(bodyParser.urlencoded({extended: true}));
        App.use(compression());

        App.get('/login', (req, res) =>
        {
            res.render("index.pug", {title: 'Login', icon: logo});
        })
        .get('/register', (req, res) =>
        {
            res.render('register.pug', {title: 'Register', icon: logo});
        })
        .get('/', (req, res) =>
        {
            res.redirect('/dashboard');
        })
        .get('/dashboard', (req, res) =>
        {
            res.render('dashboard.pug', {title: 'Dashboard', icon: logo});
        })
        .post('/dashboard', async (req, res) =>
        {
            if ((req.body.token == 404) || (await database.find(req.body.username, req.body.token) == false))
            {
                res.send('redirect');
            }
            else
            {
                res.send({
                    authenticated: true,
                    pfp: (await database.get({username: req.body.username, token: req.body.token})).pfp
                })
            }
        })
        .get('/public', (req, res) =>
        {
            res.render('public.pug', {title: 'Public Room', icon: logo});
        })
        .post('/public', async (req, res) =>
        {
            if ((req.body.token == 404) || (await database.find(req.body.username, req.body.token) == false))
            {
                res.send('redirect');
            }
            else
            {
                res.send({
                    authenticated: true,
                    s: secret,
                    pfp: (await database.get({username: req.body.username, token: req.body.token})).pfp
                })
            }
        })
        .post('/login', async (req, res) =>
        {
            var loginData = await database.login({
                username: req.body.username,
                password: req.body.password
            });
            res.send(loginData);
        })
        .post('/pfpChange', (req, res) =>
        {
            var pfp = req.body.pfp;
            var username = req.body.username;
            var token = req.body.token;
            if (pfp && pfp.trim()) database.updatePfp(username, token, pfp);
            res.end();
        })
        .post('/register', async (req, res, next) =>
        {
            var registerData = await database.register({
                username: req.body.username,
                password: req.body.password
            });
            res.send(registerData);
        })
        .get('*', (req, res) =>
        {
            res.status(404).render('error.pug', {err: "Couldn't find the page you requested", title: "Error"});
        })
    }
}