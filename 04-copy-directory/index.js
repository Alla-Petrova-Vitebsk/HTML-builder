const fs = require('fs/promises');
const {join} = require('path');

const destinationDir = join(__dirname, 'files-copy');
const sourceDir = join(__dirname, 'files');

//create folder 'files-copy' 
const createFolder = async () => {
   try {
      await fs.mkdir(destinationDir, { recursive: true });
      console.log('create');
   } catch (err) {
      console.error(err);
   }
}

//delete folder  'files-copy' 
const deleteFolder = async () => {
   try {
      await fs.rm(destinationDir, { recursive: true });
      console.log('Delete');
   } catch (err) {
      console.error(err);
   }
}

//copy files from 'files' to 'files-copy'/
const copyFiles = async () => {
   try {
      const itemsInDir = await fs.readdir(sourceDir,{withFileTypes:true});
      for (const item of itemsInDir) {
         const sourceFile = join(sourceDir,`${item.name}`);
         const destinationFile = join(destinationDir,`${item.name}`);
         if (item.isFile())
         await fs.copyFile(sourceFile,destinationFile);
      }
      console.log('Copied');
   } catch (err) {
      console.error(err);
   }
}

const copyDir = async () => {
   await deleteFolder();
   await createFolder();
   await copyFiles();

}

copyDir();

