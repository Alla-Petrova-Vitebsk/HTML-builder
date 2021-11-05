const fs = require ('fs');
const path = require('path');

const pathDirTo = path.join (__dirname,'files-copy');
const pathDirFrom = path.join(__dirname,'files');



//1. create folder 'files-copy' 
fs.mkdir(pathDirTo,
   {recursive:true},  //options where dir is exists
   (err) => {if (err) throw err;
   });

//2. delete all files from folder  'files-copy' 
fs.readdir(pathDirTo, (err, files) => {
   if (err) throw err;
    files.forEach(file => {
     fs.unlink(path.join(pathDirTo, file), err => {
       if (err) throw err;
     });
   });
 });



//3. copy files from 'files' to 'files-copy'
   fs.readdir(pathDirFrom,     //use readdir for read folder
   {withFileTypes: true},
   (err,items) => {
      if (err) throw err;
      items.forEach(item => {   //for each file in folder
         const pathFileFrom = path.join(pathDirFrom, `${item.name}`); //create full file name from copied folder 
         const pathFileTo = path.join(pathDirTo,`${item.name}`);      //create full file name for target folder
         fs.copyFile(pathFileFrom, pathFileTo,                        //use copyFile  
            (err) => {
               if(err) throw err;
        });
      });
   });

 console.log(`\nFiles from ${pathDirFrom}  copied into  ${pathDirTo}\n`);




