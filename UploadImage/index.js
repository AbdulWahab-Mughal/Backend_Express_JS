const express = require("express");
const upload = require("./middlewares/multerMiddleware");
const uploadOnCloudinary = require("./utils/cloudinary");
const app = express();
const PORT = "3000";

app.use(express.json());

app.get("/api/checks", (req, res) => {
  res.json({
    status: true,
    message: "Server Runs Properly",
  });
});

app.post("/api/uploadfile", upload.single("image"), async (req, res) => {
  try {
    const uploadimg = await uploadOnCloudinary(req.file.path);
    // console.log(uploadimg);
    res.json({
        status:true,
        message:"Uploaded image successfully!",
        data: uploadimg.url
    })
  } catch (error) {
    res.json({
      status: false,
      message: `${error.message}`,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
