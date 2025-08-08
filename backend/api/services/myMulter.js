const multer = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({
//     destination: function(req,file,cb){
//         cb(null,path.join(__dirname, '../uploads'))
//     },
//     filename: function(req,file,cb){
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     const ext = path.extname(file.originalname);        
//     cb(null, file.fieldname + '-' + uniqueSuffix + ext);
//     }
// })

// const upload = multer({ storage: storage });
// console.log('Multer upload middleware initialized');
// module.exports = upload; 

///////////////////////////////////////////
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

module.exports = upload;
