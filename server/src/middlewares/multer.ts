import multer from "multer";
import express from "express";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "");
  },
  filename: function (req, file, cb) {
    cb(null, Math.floor(Math.random() * 10000) + "" + Date.now());
  },
});
const multerFile = multer({
  storage: storage, limits: {
    fileSize: 10 * 1024 * 1024
  }, fileFilter: async (req, files, cb) => {
    let flag = true;
    if (!("main_images" in req.files)) {
      cb(new Error(`main_images:Image is required!`));
      flag = false;
    }
    const allowedMimes = ['image/jpeg', 'image/svg', 'image/png'];
    if (!allowedMimes.includes(files.mimetype)) {
      cb(new Error(`${files.fieldname}:Only .png, .jpg and .jpeg format allowed!`));
      flag = false;
    }
    if (flag) {
      cb(null, true);
    }
  }
})
  .fields([
    { name: "main_images", maxCount: 1 },
    { name: "other_images_1", maxCount: 1 },
    { name: "other_images_2", maxCount: 1 },
    { name: "other_images_3", maxCount: 1 },
  ]);
const uploadFile = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const err: any = {};
  multerFile(req, res, function (error: any) {
    if (error) {
      if (error.code == 'LIMIT_FILE_SIZE') {
        err[error.field] = 'File Size is too large. Allowed file size is 10MB';
        req.flash('formErrors', JSON.stringify(err))
        req.flash('formData', JSON.stringify(req.body))
      } else {
        let eobj = error.message.split(':');
        err[eobj[0]] = eobj[1];
        req.flash('formErrors', JSON.stringify(err))
        req.flash('formData', JSON.stringify(req.body))
      }
      return res.redirect("/product/create");
    }
    next();
  })
}
export { uploadFile };
