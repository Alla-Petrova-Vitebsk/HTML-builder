const fs = require('fs');
const path = require('path');
const fsPromise = require('fs').promises;

const pathTemplate = path.join (__dirname,'template.html');
const pathDirTo = path.join (__dirname,'project-dist');


//1. create folder 'project-dist'
fs.mkdir(pathDirTo,
   {recursive:true},  //options where dir is exists
   (err) => {if (err) throw err;
   });


//2. 

(async function (){

const templateFile = async() => {
   const templateContent = await fsPromise.readFile(pathTemplate,'utf-8', (err) => {if (err) throw err});
   return await templateContent.toString(); 
};
let strTemplate = await templateFile(); //content template.html
//console.log (str);
let tags = strTemplate.match(/{{[a-z]+}}/gi);  //example: ['{{header}}',...]
 //console.log (tegs);

//д.б. цикл ****** 0 .. tags.length - 1
let tag1 = tags[0].substring(2,tags[0].length - 2); //example: 'header'
//console.log(teg1);
let fileName = tag1 + '.html';
let pathTag = path.join(__dirname,'components', `${fileName}`);
//console.log (pathTag);

 /*  file from components*/
const tagFile = async() => {
   const tagContent = await fsPromise.readFile(pathTag,'utf-8', (err) => {if (err) throw err});
   return await tagContent.toString(); 
};
let strTag = await tagFile();
//console.log (strTag);

let strNew = strTemplate.replace(tags[0],strTag);
//console.log (strNew);




//****** конец цикла 

})();

//3.
//4.


console.log(`\n OK! Files in folder "project-dist"\n`);

