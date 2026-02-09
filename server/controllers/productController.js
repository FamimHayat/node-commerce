const categorySchema = require("../models/categorySchema");
const productSchema = require("../models/productSchema");
const { uploadToCloudinary } = require("../cloudinary/cloudinaryService");
const size = ["s", "m", "l", "xl", "2xl", "3xl"];
const createProduct = async (req, res) => {
  try {
    const {
      title,
      slug,
      description,
      category,
      price,
      discountPercentage,
      variants,
      tags,
      isActive,
    } = req.body;

    const thumbnail = req.files.thumbnail;
    const gallery = req.files.gallery;

    if (!title)
      return res.status(400).send({ error: "product title is required..!" });
    if (!slug)
      return res.status(400).send({ error: "product slug is required..!" });
    const isExistSlug = await productSchema.findOne({
      slug: slug.toLowerCase(),
    });
    if (isExistSlug) return res.status.send({ error: "slug already exist..!" });
    if (!description)
      return res
        .status(400)
        .send({ error: "product description is required..!" });
    if (!category)
      return res.status(400).send({ error: "product category is required..!" });
    const isExistCategory = await categorySchema.findById(category);
    if (!isExistCategory)
      return res
        .status(400)
        .send({ error: "product category does not exist..!" });
    if (!price)
      return res.status(400).send({ error: "product price is required..!" });

    console.log(thumbnailUrl.secure_url);
    console.log(Array.isArray(variants));
    console.log(variants);

    if (!Array.isArray(variants) || variants.length === 0)
      return res
        .status(400)
        .send({ error: "minimum 1 variant is required..!" });

    for (const requirements of variants) {
      console.log(requirements);
      if (!requirements.sku)
        return res.status(400).send({ error: "sku is required..!" });
      if (!requirements.color)
        return res.status(400).send({ error: "color is required..!" });
      if (!requirements.size)
        return res.status(400).send({ error: "size is required..!" });
      if (!size.includes(variants.size))
        return res.status(400).send({ error: "invalid product size..!" });
      if (!requirements.stock)
        return res.status(400).send({ error: "stock is required..!" });
    }

    const skuSet = variants.map((v) => v.sku);
    if (new Set(skuSet).size !== skuSet.length)
      return res.status(400).send({ error: "sku must be unique..!" });

    if (!thumbnail || thumbnail.length < 1)
      return res
        .status(400)
        .send({ message: "product thumbnail is required..!" });
    if (gallery && gallery?.length > 4)
      return res
        .status(400)
        .send({ message: "you can upload maximum 4 images" });

    const thumbnailUrl = await uploadToCloudinary(thumbnail[0], "thumbnail");

    const imageUrls = [];

    if (gallery) {
      for (const item of gallery) {
        const imgUrl = await uploadToCloudinary(item, "product_gallery");
        imageUrls.push(imgUrl.secure_url);
      }
    }

    const newProduct = productSchema({
      title,
      slug: slug.toLowerCase(),
      description,
      category,
      price,
      discountPercentage,
      thumbnail: thumbnailUrl.secure_url,
      images: imageUrls,
      variants,
      tags,
      isActive,
    });

    newProduct.save();

    res.status(201).send({ success: "product was created successfully..!" });
  } catch (error) {
    res.status(500).send({ error: "500 : internal server error..!" });
    console.log(`createProduct: from productController ${error.message}`);
  }
};

const getProduct = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).send({ error: "500 : internal server error..!" });
    console.log(`getProduct: from productController ${error.message}`);
  }
};

module.exports = { createProduct };
