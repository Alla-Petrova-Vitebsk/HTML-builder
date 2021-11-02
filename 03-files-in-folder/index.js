const fs = require('fs');
const path = require('path');

const pathdir = path.join(__dirname, 'secret-folder');  //path to directory secret-folder

fs.readdir(                                              //readdir - read directory and files from secret-folder
   pathdir,                                   
   { withFileTypes: true },                            // withFileTypes - for use methods of class Dirent (isFile)
   (err, items) => {                                   //callback function
      if (err) throw err;
      items.forEach(file => {
         if (file.isFile()) {
            const pathfile = path.join(__dirname, 'secret-folder', `${file.name}`);
            fs.stat(pathfile, (err, filestats) => {                                         //stat for info about filesize
               if (err) throw err;
               const fileNameFull = file.name;                                             //return full filename: example.txt  
               const fileName = fileNameFull.substring(0, fileNameFull.indexOf('.'));       // return filename: example
               const fileExt = path.extname(pathfile).slice(1);                            //return extension without '.' (.ext)
               const fileSize = filestats.size / 1024;                            //return in Kb
               console.log(`${fileName} - ${fileExt} - ${fileSize} Kb`);
            })
         }
      });
   });

