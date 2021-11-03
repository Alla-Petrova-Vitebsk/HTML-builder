const fs = require('fs');
const path = require('path');

const pathDirFrom = path.join(__dirname,'styles');
const pathFileTo = path.join(__dirname,'project-dist','bundle.css');

fs.writeFile(pathFileTo, //use writefile for create new empty file 'bundle.css' or rewrite if this file is exist
   '',
   (err) =>  {if (err) throw err;
   });

fs.readdir(pathDirFrom,               //use readdir for read folder 'styles'
   {withFileTypes: true},             //this option - for use check 'isFile'
   (err, items) => {                  //callback for treatment array files and folders - 'items'  and  error  - 'err'
      if (err) throw err;
      items.forEach(item => {         //  pass on files in folder
         if (item.isFile()){          
            const pathFile = path.join(pathDirFrom,`${item.name}`); //full path for file
            const fileExt = path.extname(pathFile);   // receive extension file
            if(fileExt === '.css') {
               fs.readFile(pathFile,              //read file
                  'utf-8',
                  (err,data) => {       //callback for treatment content file - 'data' and error
                     if (err) throw err;
                  fs.appendFile(pathFileTo,  //use append for add 'data' into file 'bandle.css'
                     data,
                     (err) => {
                     if (err) throw err;
                     })
                  }
               )}
         }
      })
   });

    console.log(`\n OK! File "bundle.css" in folder "project-dist"\n`);