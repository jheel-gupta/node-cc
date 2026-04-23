const express = require('express');

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');


//this will be used incase we store are ejs in a folder other than smth valled views, views is default
app.set('views','myviews')

//listen for requests
app.listen(3000);

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







// const express = require('express');

// // express app
// const app = express();

// // register view engine
// app.set('view engine', 'ejs');


// //this will be used incase we store are ejs in a folder other than smth valled views, views is default
// app.set('views','myviews')

// //listen for requests
// app.listen(3000);

// app.get('/', (req,res) => {
//    // res.send('<p>home page</p>');
//    // how to send html FILE as a response!
//    res.sendFile('./views/index.html', {root:__dirname })
// })

// app.get('/about', (req,res) => {
//    res.sendFile('./views/about.html', {root:__dirname })
// })

// //redirects

// app.get('/about-us', (req,res) => {
//     res.redirect('/about')
// });

// //404 page (default)

// //use function works for EVERY incoming request in case the code reaches this point and the code does not match any of the above cases
// //should always be at the VERY bottom
// app.use((req, res) => {
//     res.sendFile('./views/404.html', {root: __dirname});
// })