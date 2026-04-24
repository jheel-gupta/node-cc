const express = require('express');
const morgan = require('morgan'); //middleware provided by express itself
const mongoose = require('mongoose');
const Blog = require('./models/blog.js');
require('dotenv').config();
// express app
const app = express();

//connect to mongodb

console.log("ENV", process.env.dbURI);

mongoose.connect(process.env.dbURI)
    .then((result) => app.listen(3000)) //only listen for requests after the conncection to the database has been established!
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');


//this will be used incase we store are ejs in a folder other than smth valled views, views is default
app.set('views','myviews')


//middleware & static files
app.use(express.static('./myviews/public')); //this means myviews/public -> / so its the ROOT! so itll be accessed as /styles.css in the header while linking :)
app.use(morgan('dev'));


app.get('/', (req,res) => {
    res.redirect('/blogs');

//    const blogs= [
//     {title: 'Jheel finds eggs', snippet:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem fugiat soluta officiis rerum labore deleniti saepe dolore? Voluptate architecto aspernatur quisquam doloribus. Ducimus repudiandae ratione molestiae doloremque nisi enim hic.'},
//     {title: 'Jheel finds stars', snippet:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem fugiat soluta officiis rerum labore deleniti saepe dolore? Voluptate architecto aspernatur quisquam doloribus. Ducimus repudiandae ratione molestiae doloremque nisi enim hic.'},
//     {title: 'Jheel does laundry', snippet:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem fugiat soluta officiis rerum labore deleniti saepe dolore? Voluptate architecto aspernatur quisquam doloribus. Ducimus repudiandae ratione molestiae doloremque nisi enim hic.'},
//    ];

//    res.render('index', {title: 'Home', blogs}); //here {title: 'home' is passing data into views}
})

app.get('/about', (req,res) => {
   res.render('about', {title: 'About'})
})

//blog routes
app.get('/blogs', (req,res) => {
    Blog.find().sort({createdAt:1})
        .then((result) => {
            res.render('index', {title: 'All Blogs', blogs: result})
        })
        .catch((err)=> {
            console.log(err);
        })
})

app.get('/blogs/create',(req,res) => {
    res.render('create', {title: 'Create anew Blog'});
})

//404 page (default)

//use function works for EVERY incoming request in case the code reaches this point and the code does not match any of the above cases
//should always be at the VERY bottom
app.use((req, res) => {
    res.render('404',{title: 'Error'})
})







