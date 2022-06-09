const fs = require('fs/promises');
const { join } = require('path');

const destinationDir = join(__dirname, 'files-copy');
const sourceDir = join(__dirname, 'files');

//create folder 'files-copy' 
const createFolder = async (destinationDir) => {
   try {
      await fs.mkdir(destinationDir, { recursive: true });
   } catch (err) {
      console.error(err);
   }
}

//delete folder  'files-copy' 
const deleteFolder = async (destinationDir) => {
   try {
      await fs.rm(destinationDir, { recursive: true });
   } catch (err) {
      console.error(err);
   }
}

//copy files from 'files' to 'files-copy'/
const copyFiles = async (sourceDir, destinationDir) => {
   try {
      await createFolder(destinationDir);
      const itemsInDir = await fs.readdir(sourceDir, { withFileTypes: true });
      for (const item of itemsInDir) {
         const sourceFile = join(sourceDir, `${item.name}`);
         const destinationFile = join(destinationDir, `${item.name}`);
         if (item.isFile()) {
            await fs.copyFile(sourceFile, destinationFile);
         } else {
            await copyFiles(sourceFile, destinationFile); //recursion
         }
      }
   } catch (err) {
      console.error(err);
   }
}

const copyDir = async () => {
   await deleteFolder(destinationDir);
   await copyFiles(sourceDir, destinationDir);
   console.log('Copied');
}

copyDir();

