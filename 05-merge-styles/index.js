const fs = require('fs');
const path = require('path');

const pathDirFrom = path.join(__dirname,'styles');
const pathFileTo = path.join(__dirname,'project-dist','bundle.css');

fs.writeFile(pathFileTo, //create 
   '',
   (err) =>  {if (err) throw err;
   });


fs.readdir(pathDirFrom,
   {withFileTypes: true},
   (err, items) => {
      if (err) throw err;
      items.forEach(item => {
         if (item.isFile()){
            const pathFile = path.join(pathDirFrom,`${item.name}`);
            const fileExt = path.extname(pathFile);
            if(fileExt === '.css') {
               fs.readFile(pathFile,
                  'utf-8',
                  (err,data) => {
                     if (err) throw err;
                  fs.appendFile(pathFileTo,
                     data,
                     (err) => {
                     if (err) throw err;
                     })
                  }
               )}
         }
      })
   });