// Setup Express and Middlewares
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const cookieParser = require('cookie-parser');
const { isAuth, isOwnerMiddleware } = require('../utils');

module.exports = (express, app) => {

    app.use(express.static('static'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use(cookieParser());

    app.use(isAuth);

    app.use(isOwnerMiddleware);

    //  Setup View Engine 
    var hbs = exphbs.create({
        layoutsDir: 'views',
        defaultLayout: 'base-layout.hbs',
        partialsDir: 'views/partials',
        extname: 'hbs',
        handlebars: allowInsecurePrototypeAccess(Handlebars)
    });

    app.engine('hbs', hbs.engine);
    app.set('viewengine', 'hbs');
};