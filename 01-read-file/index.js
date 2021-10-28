const path = require('path');
const fs = require('fs');

const readStream = fs.createReadStream(  // create stream
   path.join(__dirname,'text.txt'), //path to file
   'utf-8'  
 );
 readStream.on('data',(chunk) => console.log(chunk));
 readStream.on('error',(err) => console.log ('Error',err.message));