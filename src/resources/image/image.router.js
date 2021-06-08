import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import config from '../../config';
import Logger from '../../utils/logger';

const router = Router();

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
});

const rootPath = process.cwd();
const upload = multer({ dest: path.resolve(rootPath, 'uploads') });

const removeImage = (imagePath) => {
  fs.unlink(imagePath, (err) => {
    if (err) {
      Logger.error(err);
    }
    Logger.info('Image removed from server!');
  });
};

router.route('/').post(upload.single('upload'), async (req, res) => {
  const imagePath = path.resolve(rootPath, 'uploads', req.file.filename);
  try {
    const imageUrl = await cloudinary.uploader.upload(imagePath);
    res.send(imageUrl);
  } catch (error) {
    Logger.error(error);
  } finally {
    removeImage(imagePath);
  }
});

module.exports = router;
