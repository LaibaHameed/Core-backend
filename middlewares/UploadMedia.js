//!Dependencies

// npm install --save multer
// Multer is a node. js middleware for handling multipart/form-data , which is primarily used for uploading files. It is written on top of busboy for maximum efficiency. NOTE: Multer will not process any form which is not multipart ( multipart/form-data)
const multer = require('multer');
// npm install crypto-js
const crypto = require('crypto');
const fs = require('fs'); //Create File or Folder or Read File Delete File Local machine

//! Dependencies

//?Block Start For Hashing the ImageUrl

const hashFunc = (fileName) => {
    const hash = crypto.createHash('md5');
    hash.update(fileName);
    const md5sum = hash.digest('hex');
    return md5sum;
};

//?Block Ends For Hashing the ImageUrl


//?Block Start MiddleWare For handling The Single Image WIth HashFunction.

let UploadProductImage = multer({
    storage: multer.diskStorage({
        destination: (req, next, cb) => {
            let path = `./assets/Product`;
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path, function (err, res) {
                    if (err) {
                        res.json(err);
                    }
                    else {
                        res.json('Saved Succefully');
                    }
                });
            }
            cb(null, path);
        },
        filename: (req, file, cb) => {
            const md5sum = hashFunc(file.originalname);
            //originalname is the uploaded file's name with date iso String , ext short form of extension
            let ext = file.mimetype.split('/')[1];
            // Fix svg+xml bug
            if (ext.includes('svg')) {
                ext = 'svg';
            }
            // file name creation (Date+md5sum+ext)
            cb(null, `${Date.now()}_${md5sum}.${ext}`);
        }
    })
});

//?Block Ends MiddleWare For handling The Single Image WIth HashFunction.

module.exports = { UploadProductImage };