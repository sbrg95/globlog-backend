import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import config from '../../config';
import Logger from '../../utils/logger';

const router = Router();

cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.api_key,
  api_secret: config.api_secret,
});

const upload = multer({ dest: path.resolve(__dirname, 'uploads') });

const removeImage = (imagePath) => {
  fs.unlink(imagePath, (err) => {
    if (err) {
      Logger.error(err);
    }
    Logger.info('Image removed from server!');
  });
};

router.route('/').post(upload.single('upload'), (req, res) => {
  const imagePath = path.resolve(__dirname, 'uploads', req.file.filename);
  cloudinary.uploader.upload(imagePath, (error, result) => {
    if (error) {
      Logger.error(error);
    }
    res.send(result);
  });
  removeImage(imagePath);
});

module.exports = router;
