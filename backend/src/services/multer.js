// const express = require("express");
const multer = require("multer");
const { v4 } = require("uuid");

// ! Implement the upload of video files for adding or editing a film with the multer package.

const imagesStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/assets/images");
  },
  filename: (req, file, cb) => {
    const extArray = file.mimetype.split("/");
    const extension = extArray[extArray.length - 1];
    // eslint-disable-next-line prefer-template
    const name = v4() + "." + extension;

    if (req.body.cover) {
      req.body.cover = name;
    }

    if (req.body.miniature) {
      req.body.miniature = name;
    }

    console.warn("req.body.images in imagesStorage", req.body.images);
    cb(null, name);
  },
});

const imagesStorage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/assets/images");
  },
  filename: (req, file, cb) => {
    const extArray = file.mimetype.split("/");
    const extension = extArray[extArray.length - 1];
    // eslint-disable-next-line prefer-template
    const name = v4() + "." + extension;

    if (req.body.cover) {
      req.body.cover = name;
    }

    if (req.body.miniature) {
      req.body.miniature = name;
    }

    console.warn("req.body.cover in imagesStorage", req.body.cover);
    console.warn("req.body.miniature in imagesStorage", req.body.miniature);
    cb(null, name);
  },
});

const uploadImages = multer({ storage: imagesStorage });
const uploadImages2 = multer({ storage: imagesStorage2 });

module.exports = {
  uploadImages,
  uploadImages2,
};
