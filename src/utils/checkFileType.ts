// // const path = require("path");
// import path from "path";

// export const checkFileType = function (file, cb) {
//   //Allowed file extensions
//   const fileTypes = /jpeg|jpg|png|gif|webp|svg/;

//   //check extension names
//   const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

//   const mimeType = fileTypes.test(file.mimetype);

//   if (mimeType && extName) {
//     return cb(null, true);
//   } else {
//     cb("Error: You can Only Upload Images!!");
//   }
// };