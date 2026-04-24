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
app.use(express.urlencoded({ extended: true})); //used for POST req so that data coming from FORM in create.ejs by post method to /blog is converted to READABLE DATA so that we can use it here in app.post as response!
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
    Blog.find().sort({createdAt: -1})
        .then((result) => {
            res.render('index', {title: 'All Blogs', blogs: result})
        })
        .catch((err)=> {
            console.log(err);
        })
})

app.get('/blogs/create',(req,res) => {
    res.render('create', {title: 'Create a new Blog'});
})



//POST BLOG METHOD (FROM CREATE.EJS)

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body); //req.body is used when data is coming from forms

    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        })
})

//blog details using blog id
app.get('/blogs/:id', (req,res) => { //gotta use :id if we are looking for route parameter, cant use only id
    const id = req.params.id; //obtaining data (id) from url
    Blog.findById(id)
        .then(result => {
            res.render('details', { title: 'Blog Details', blog: result})
        })
        .catch((err) => {
            console.log(err);
        })
})

//DELETE BLOG

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({redirect: '/blogs'})
        })
        .catch(err => {
            console.log(err);
        })
})


//404 page (default)
//use function works for EVERY incoming request in case the code reaches this point and the code does not match any of the above cases
//should always be at the VERY bottom
app.use((req, res) => {
    res.render('404',{title: 'Error'})
})







