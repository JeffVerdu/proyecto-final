const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = async (buffer, filename) => {
  return await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { public_id: `productos/${filename}`, resource_type: "image" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result.secure_url);
        }
      )
      .end(buffer);
  });
};

module.exports = { uploadToCloudinary };
