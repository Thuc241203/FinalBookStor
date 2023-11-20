import cloudinary from "../config/cloudinary.js";
export const uploadImage = async (req, res) => {
  const files = req.files;

  if (!Array.isArray(files))
    return res.status(400).json({ error: "Không có File được tải lên" });
  try {
    const uploadPromises = files.map((file) => {

      return cloudinary.uploader.upload(file.path);
    });

    const results = await Promise.all(uploadPromises);

    const uploadedFiles = results.map((result) => ({
      publicId: result.public_id,
      url: result.secure_url,
    }));
    return res
      .status(200)
      .json({ message: `up ảnh thành công`, uploadedFiles });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
