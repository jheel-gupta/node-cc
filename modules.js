const { people, ages  } = require('./people'); //instead of const xyz = require()
console.log(people, ages); //instead of xyz.people or xyz.ages

const os = require('os');
console.log(os.platform(), os.homedir());
