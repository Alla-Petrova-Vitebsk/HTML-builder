const fs = require('fs');
const path = require('path');
const fsPromise = require('fs').promises;

const pathTemplate = path.join(__dirname, 'template.html');
const pathDirTo = path.join(__dirname, 'project-dist');
const pathFileToHtml = path.join(__dirname, 'project-dist', 'index.html');
const pathDirFromCss = path.join(__dirname, 'styles');
const pathFileToCss = path.join(__dirname, 'project-dist', 'style.css');
const pathDirFromAssets = path.join(__dirname,'assets');
const pathDirToAssets = path.join(__dirname,'project-dist','assets');

//in this function use fs.writeFile for create new empty file(path) or rewrite if this file is exist
function createFile(path) {
   fs.writeFile(path,
      '',
      (err) => {
         if (err) throw err;
      });
};

//in this function use fs.appendFile for add content(data) into file(path)
function addContentToFile(path, data) {
   fs.appendFile(path,
      data,
      (err) => {
         if (err) throw err;
      });
};

//in this function use  fs.create for create folder(path)
function createDir (path) {
   fs.mkdir(path,
      { recursive: true },  //options when dir is exists
      (err) => {
         if (err) throw err;
      });
};

//in this function use recursively copy folders with files (folder pathTo not exists )
function copyDir(pathFrom,pathTo){
   createDir(pathTo);
   fs.readdir(pathFrom, {withFileTypes: true}, 
      (err, items) => { 
       if (err) throw err;
       items.forEach (item => {
         const pathToNew = path.join(pathTo,`${item.name}`); 
         const pathFromNew = path.join(pathFrom,`${item.name}`);
         if (item.isDirectory()) {
           copyDir(pathFromNew,pathToNew);
        } else {
         fs.copyFile(pathFromNew,pathToNew,     //use copyFile  
            (err) => {if(err) throw err;
         });
        };
      });
   });
  };

  
//1. create folder 'project-dist'
createDir(pathDirTo);

//2. create newHtml
createFile(pathFileToHtml);
//in this self-calling function created html (string) from template and tags
(async function () {
   //content from Template into strTemplate (string)    
   const templateFile = async () => {
      const templateContent = await fsPromise.readFile(pathTemplate, 'utf-8', (err) => { if (err) throw err });
      return await templateContent.toString();
   };
   let strTemplate = await templateFile(); //content from template.html
   //tag from strTemplate into array - tags
   const tags = strTemplate.match(/{{[a-z]+}}/gi);  //example: ['{{header}}',...]
   //circle on array - function for replace template tags contents from files 
   async function processArray(array) {
      for (const tag of array) {
         let tag1 = tag.substring(2, tag.length - 2); //example: 'header'
         let fileName = tag1 + '.html';
         let pathTag = path.join(__dirname, 'components', `${fileName}`);
         const tagFile = async () => {  //function - read content(tagContent) from file(pathTag)
            const tagContent = await fsPromise.readFile(pathTag, 'utf-8', (err) => { if (err) throw err });
            return await tagContent.toString();
         };
         let strTag = await tagFile();
         strTemplate = strTemplate.replace(tag, strTag);
      }
      return await strTemplate;
   };
   const newHtml = await processArray(tags); //string newHtml - call function 
   addContentToFile(pathFileToHtml, newHtml);    //call function for write content(newHtml) into file 
})();

//3. create style.css from files in folder styles
fs.readdir(pathDirFromCss,               //use readdir for read folder 'styles'
   { withFileTypes: true },             //this option - for use check 'isFile'
   (err, items) => {
      if (err) throw err;
      items.forEach(item => {         //  pass on files in folder
         if (item.isFile()) {
            const pathFile = path.join(pathDirFromCss, `${item.name}`); //full path for file
            const fileExt = path.extname(pathFile);   // receive extension file
            if (fileExt === '.css') {
               fs.readFile(pathFile,              //read file
                  'utf-8',
                  (err, data) => {       //callback for treatment content file - 'data' and error
                     if (err) throw err;
                     addContentToFile(pathFileToCss, data); //call function
                  });
            };
         };
      });
   });

//4.copy folder assets in project-dist/assets
copyDir(pathDirFromAssets,pathDirToAssets);


console.log(`\n OK! Files in folder "project-dist"\n`);



