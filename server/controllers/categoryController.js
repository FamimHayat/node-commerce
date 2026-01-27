const { uploadToCloudinary } = require("../cloudinary/cloudinaryService");
const categorySchema = require("../models/categorySchema");

const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name)
      return res.status(400).send({ error: "category name is required..!" });
    if (!req.file)
      return res.status(400).send({ error: "thumbnail is required..!" });

    const imageFile = await uploadToCloudinary(req.file, "thumbnail");

    const categoryName = categorySchema({
      name,
      description,
      thumbnail: imageFile.secure_url,
    });

    const existingCategoryName = await categorySchema.findOne({ name });

    if (existingCategoryName)
      return res
        .status(400)
        .send({ error: "category with this name already exists..!" });

    categoryName.save();

    res.status(201).send({ success: "a new category created successfully..!" });

    console.log(req.file);
  } catch (error) {
    res.status(500).send({ error: "500 : internal server error..!" });
    console.log(`createCategory: from categoryController ${error.message}`);
  }
};

const getAll = async (req, res) => {
  try {
    const categories = await categorySchema.find({});
    res.status(200).send({ success: "all categories", categories });
  } catch (error) {
    res.status(500).send({ error: "500 : internal server error..!" });
    console.log(`createCategory: from categoryController ${error.message}`);
  }
};

module.exports = { createCategory, getAll };
