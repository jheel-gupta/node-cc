const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const serverInstace = http.createServer((req, res) => {
    
    //lodash

    const num= _.random(0, 20);
    console.log(num);

    const greet = _.once(() => {
        console.log('hello');
    })

    greet();
    greet();
//  set header -> telling browser the content type we're sending back

//  res.setHeader('Content-Type', 'text/plain'); //means we're sending back plain text to the browser
//  res.write('hello,ninjas'); //the actual text we're sending

    res.setHeader('Content-Type', 'text/html');

    // res.write('<head><link rel="stylesheet href="#></head>');
    // res.write('<p>hello, jheeel</p>');
    // res.end();

    let path = './views/'; //as all the sub pages urls will always start with path
    switch(req.url) { //checking which url the user is visiting
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path+='about.html';
            res.statusCode = 200;
            break;
        case '/about-blah':
            res.statusCode = 301; //indicates that the rsr ure trying to access has been permanently moved
            res.setHeader('Location','/about');
            res.end();
            break;
        default:
            path +='404.html';
            res.statusCode = 404; //we can check this in insept -> netowrk -> status
            break;
    }

    //send an htmlfile 
    fs.readFile(path, (err,data) => {
        if(err){
            console.log(err);
            res.end();
        } 
        else {
            res.write(data);
            res.end();
        }
    });
});

serverInstace.listen(3000, 'localhost', () => {
    console.log("listening for requests on port 3000")
});