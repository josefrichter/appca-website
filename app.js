const express = require('express');
const expressNunjucks = require('express-nunjucks');
const app = express();
const isDev = app.get('env') === 'development';
 
app.set('views', __dirname + '/templates');
 
const njk = expressNunjucks(app, {
    watch: isDev,
    noCache: isDev
});
 
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/comingsoon', (req, res) => {
    res.render('comingsoon');
});

app.get('/contact-us', (req, res) => {
    res.render('contact-us');
});

app.get('/sneakpeek', (req, res) => {
    res.render('sneakpeek');
});

app.get('/testimonials', (req, res) => {
    res.render('testimonials');
});

app.listen(3000);