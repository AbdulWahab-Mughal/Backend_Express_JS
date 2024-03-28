const { v2: cloudinary } = require("cloudinary");
// import { v2 as cloudinary } from "cloudinary";
const fs = require("fs");

cloudinary.config({
  cloud_name: "dkpo8322c",
  api_key: "852585676234981",
  api_secret: "WSPZ395HZfRwtIT02eAAZjxjVR8",
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // console.log("File:", response);
    return response;
  } catch (error) {
    // fs is file system used to handles files, unlinksync in used to unlink or delete file from server
    fs.unlinkSync(localFilePath);
    return null;
  }
};

module.exports = uploadOnCloudinary;
