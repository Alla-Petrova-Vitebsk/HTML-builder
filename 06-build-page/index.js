const fs = require('fs');
const path = require('path');

const fsPromise = require('fs').promises;
const pathTemplate = path.join (__dirname,'template.html');


(async function (){

const templateFile = async() => {
   const templateContent = await fsPromise.readFile(pathTemplate,'utf-8', (err) => {if (err) throw err});
   return await templateContent.toString(); 
};
let strTemplate = await templateFile();
//console.log (str);
 let tags = strTemplate.match(/{{[a-z]+}}/gi);  //example: ['{{header}}',...]
 //console.log (tegs);

//д.б. цикл ****** 0 .. tags.length - 1
let tag1 = tags[0].substring(2,tags[0].length - 2); //example: 'header'
//console.log(teg1);
let fileName = tag1 + '.html';
const pathTag = path.join(__dirname,'components', `${fileName}`);
//console.log (pathTag);

 /*  file from components*/
const tagFile = async() => {
   const tagContent = await fsPromise.readFile(pathTag,'utf-8', (err) => {if (err) throw err});
   return await tagContent.toString(); 
};
let strTag = await tagFile();
//console.log (strTag);





//****** конец цикла 

})();


// async function readFromFile(pathFile,){
//    const fileContent = await fsPromise.readFile(pathFile,
//       'utf-8',
//       (err) => {
//          if (err) throw err;
//              });
//     return  fileContent.toString();           
//    }
//let res;
/*  using readFromFile  */
//readFromFile(pathTemplate).then ( result => {
  //console.log(result);
//  res = result;
  //console.log (res);
//});



// function findTeg(html){
// }

// function readFromComponents(tag) {
//    const fileName = tag + '.html';
//    const pathTag = path.join(__dirname,'components', `${fileName}`);
//    console.log (pathTag);
// }

//readFromComponents('footer');