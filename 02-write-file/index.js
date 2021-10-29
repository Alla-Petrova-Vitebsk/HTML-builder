const stderr = require('process');
const { stdin, stdout, exit } = process;
const fs = require('fs');
const  path = require('path');

const outputFile = fs.createWriteStream(  //create text file use stream
   path.join (__dirname,'newtext.txt'));

const readLine = require('readline');  //use readline from fs 

const rl = readLine.createInterface ({  // creates a new readline.Interface instance.
input: stdin,
output: stdout,
terminal:true
});

console.log('Inter text\n');
rl.on('line', (line) => {   //read text from console 
if (line !== 'exit') {         
   outputFile.write(line + '\n');    //write text into file
}
else exit();                    //exit when input "exit" or Ctrl C
});

process.on('exit',code => {   
if (code === 0) {
  console.log('\nOk! Text in file - Newtext.txt');   //output OK when no error
}else {
stderr.write (`Error code = ${code}\n`);  //output when Error
}
});