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

//mongoose and mongo sandbox routes
app.get('/add-blog', (req,res) => {
    const blog = new Blog({
        title: 'new blog 22',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    });

    blog.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})

app.get('/all-blogs', (req,res) => {
    Blog.find() //something to note: when we do blog.save() we call save method on an INSTANCE of the Blog model. 
                // However when we call Blog.find() we directly call the find method ON THE MODEL ITSELF NOT AN INSTANCE OF IT
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})

app.get('/single-blog', (Req, res) => {
    Blog.findById('69eb4967e63c1d2663b431af')
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})

app.get('/', (req,res) => {
   const blogs= [
    {title: 'Jheel finds eggs', snippet:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem fugiat soluta officiis rerum labore deleniti saepe dolore? Voluptate architecto aspernatur quisquam doloribus. Ducimus repudiandae ratione molestiae doloremque nisi enim hic.'},
    {title: 'Jheel finds stars', snippet:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem fugiat soluta officiis rerum labore deleniti saepe dolore? Voluptate architecto aspernatur quisquam doloribus. Ducimus repudiandae ratione molestiae doloremque nisi enim hic.'},
    {title: 'Jheel does laundry', snippet:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem fugiat soluta officiis rerum labore deleniti saepe dolore? Voluptate architecto aspernatur quisquam doloribus. Ducimus repudiandae ratione molestiae doloremque nisi enim hic.'},
   ];

    res.render('index', {title: 'Home', blogs}); //here {title: 'home' is passing data into views}
})

app.get('/about', (req,res) => {
   res.render('about', {title: 'About'})
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







