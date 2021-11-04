const fs = require('fs');
const path = require('path');
const fsPromise = require('fs').promises;

const pathTemplate = path.join (__dirname,'template.html');
const pathDirTo = path.join (__dirname,'project-dist');
const pathFileToHtml = path.join(__dirname, 'project-dist', 'index.html');

//in this function use writefile for create new empty file or rewrite if this file is exist
function createFile (path){ 
   fs.writeFile(path, 
   '',
   (err) =>  {if (err) throw err;
   });
}


//1. create folder 'project-dist'
fs.mkdir(pathDirTo,
   {recursive:true},  //options where dir is exists
   (err) => {if (err) throw err;
   });

//2. create newHtml
createFile(pathFileToHtml);
//create html (string) from template and tags
(async function (){
 //content from Template into strTemplate (string)    
const templateFile = async() => {
   const templateContent = await fsPromise.readFile(pathTemplate,'utf-8', (err) => {if (err) throw err});
   return await templateContent.toString(); 
};
let strTemplate = await templateFile(); //content from template.html
//tag from strTemplate into array - tags
const tags = strTemplate.match(/{{[a-z]+}}/gi);  //example: ['{{header}}',...]
//circle on array with async function - replace template tags contents from files 
 async function processArray (array) {
  for (const tag of array) {
      let tag1 =  tag.substring(2,tag.length - 2); //example: 'header'
      let fileName = tag1 + '.html';
      let pathTag = path.join(__dirname,'components', `${fileName}`);
      /*  file from components*/
      const tagFile = async() => {
         const tagContent = await fsPromise.readFile(pathTag,'utf-8', (err) => {if (err) throw err});
         return await tagContent.toString(); 
      };
      let strTag = await tagFile();
      strTemplate = strTemplate.replace(tag,strTag);
   }  
     return await strTemplate;
 };
 const newHtml = await processArray(tags);
 //console.log (newHtml);

 //write into file content
 fs.appendFile(pathFileToHtml,  //use append for add string 'newHtml' into file 'index.html'
   newHtml,
   (err) => {
   if (err) throw err;
   })
})();


//3.

//4.


console.log(`\n OK! Files in folder "project-dist"\n`);

