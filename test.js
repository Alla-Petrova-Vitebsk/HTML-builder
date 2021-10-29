const {stderr} = require("process");

const { stdin, stdout, exit } = process;

/*********1***********/
//input and output
  // stdout.write('Inter name\n');
  // stdin.on('data', data => {
  //   stdout.write('Hi, ');
  //   const newdata = data.toString().split('').reverse().join('');
  //   stdout.write(newdata);
  //   process.exit();
  // });

  /*********2****************/
  //run with arg
// console.log(process.argv);
// console.log(process.argv.slice(2));

// function getArg(flag) {
//   const flagIndex = process.argv.indexOf(flag);
//   return flagIndex !== -1 ? process.argv[flagIndex + 1] : null;
// }
//const message = getArg('-m');
//console.log (message);

/********2 a+b a*b ****************/
// const operator =  process.argv[2];
// if ( operator === '-m' || operator=== '-s') { 
// stdout.write('Inter 2 number\n');
// stdin.on('data', data => {
// const newdata = data.toString();
// const arrdata = newdata.split(' ');
//   stdout.write(`${arrdata}`);
//  if (operator === '-m') {
//    const mult = +arrdata[0] * +arrdata [1];
//    stdout.write (`${mult}`);
//  } else {
//   const sum = +arrdata[0] + +arrdata [1];
//   stdout.write (`${sum}`);
//  }
//  exit();
// });
// } else{
//   stdout.write('Run with operator -m or -s');
// }


/*         file     */
// console.log(__dirname);
// console.log(__filename);

// const flag = process.argv[2];
//  switch (flag) {
//    case '-d' : { stdout.write(__dirname) }; break;
//    case '-f' : {stdout.write(__filename) }; break;
// default : {stdout.write('Run with operator -d or -f');}; break;
//  } 

/* ********* */

/*     path        */
const path = require('path');
// console.log(path.basename(__filename));
// console.log(path.dirname(__filename));
// console.log(path.parse(__filename));

//path with join to file 
//const pathTask = './01-read-file';
//const fileName = '/text.txt';
// console.log(path.join(__dirname,pathTask,fileName));

/* fs */
const fs = require('fs');
//create dir
// fs.mkdir(path.join(__dirname,'notes'), (err) => {
//  if (err) throw err;
// });

//create file and rewrite exists file
// fs.writeFile(
//   path.join(__dirname,'notes','mytext.txt'),
//   'wwwwwwwwwwwww',
//   (err) => {
//     if (err) throw err;
//   }
// );

//append into file
// fs.appendFile(
//   path.join(__dirname,'notes','mytext.txt'),
//   'add qqqqqqqqqq',
//   (err) => {
//     if (err) throw err;
//   }
// );

//read from file into console
// fs.readFile(
//   path.join(__dirname,'notes','mytext.txt'),
//   'utf-8',
//   (err,data) => {
//     if (err)throw err;
//   //console.log(data);
//   stdout.write(data);
//   }
// );

//unit os
const os = require('os');
//console.log(os.platform());
//console.log(os.arch());
//console.log(os.cpus());
// console.log(os.totalmem());
// console.log(os.freemem());
// console.log(os.homedir());

//readable stream
// const readStream = fs.createReadStream(  // create stream
//   path.join(__dirname,'01-read-file','text.txt'), //path to file
//   'utf-8'  
// );
// readStream.on('data',(chunk) => console.log(chunk));
// readStream.on('error',(err) => console.log ('Error',error.message));


/* *********** */
process.on('exit',code => {
if (code === 0) {
  stdout.write('\nOk');
}else {
stderr.write (`Error code = ${code}\n`);
}
});

