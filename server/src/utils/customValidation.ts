import    expressValidator  from 'express-validator';
// const customValidation:any = (app:any) => {
// app.use(expressValidator({
//     customValidators: {
//         isImage: function(value:string, filename) {
//             var extension = (path.extname(filename)).toLowerCase();
//             switch (extension) {
//                 case '.jpg':
//                     return '.jpg';
//                 case '.jpeg':
//                     return '.jpeg';
//                 case  '.png':
//                     return '.png';
//                 default:
//                     return false;
//             }
//         }
// }}));