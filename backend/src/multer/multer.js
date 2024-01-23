// const express = require("express");
const multer = require("multer");
const { v4 } = require("uuid");

const imagesStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/assets/images");
  },
  filename: (req, file, cb) => {
    const extArray = file.mimetype.split("/");
    const extension = extArray[extArray.length - 1];
    // eslint-disable-next-line prefer-template
    const name = v4() + "." + extension;

    if (req.body.images) {
      req.body.images.push(name);
    } else {
      req.body.images = [name];
    }
    cb(null, name);
  },
  // limits: {
  //   fieldSize: 1024 * 5,
  // },
});

const uploadImages = multer({ storage: imagesStorage });

module.exports = {
  uploadImages,
};
