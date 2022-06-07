const path = require('path');
const fs = require('fs');
const {stdout} = process;

//my
// const readStream = fs.createReadStream(  // create stream
//    path.join(__dirname,'text.txt'), //path to file
//    'utf-8'  
//  );

//  readStream.on('data',(chunk) => stdout.write(chunk));
//  readStream.on('error',(err) => console.log ('Error',err.message));

//stream
const pathToFile = path.join(__dirname,'text.txt');
const Stream = fs.createReadStream(pathToFile);
Stream.pipe(stdout);


