import path from 'path';
import express from 'express';
import multer from 'multer';
import { storage } from '../config/cloudinary.js';

const router = express.Router();
const upload = multer({ storage });

router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: 'Please upload a file' });
  }
  res.status(200).send({
    message: 'Image uploaded successfully',
    image: req.file.path, // This is the secure URL from Cloudinary
  });
});

export default router;