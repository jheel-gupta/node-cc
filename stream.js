const fs = require('fs');

const readStream = fs.createReadStream('./docs/blog3.txt', { encoding: 'utf8'}); //reading a file chunk by chunk, utf8 converts data to string automatically
const writeStream = fs.createWriteStream('./docs/blog4.txt');
 
// readStream.on('data', (chunk) => { //'data' event fires whenever a chunk is read
//     console.log('-------NEW CHUNK ---------')
//     console.log(chunk);
//     writeStream.write('\n NEW CHUNK \n');
//     writeStream.write(chunk);
// })

//piping
readStream.pipe(writeStream); //same thing as above, done in shorter manner
