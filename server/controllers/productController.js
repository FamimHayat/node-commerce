const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      price,
      discountPercentage,
      variants,
      tags,
      isActive,
    } = req.body;

    if (!title)
      return res.status(400).send({ error: "product title is required..!" });
    if (!description)
      return res
        .status(400)
        .send({ error: "product description is required..!" });
    if (!category)
      return res.status(400).send({ error: "product category is required..!" });
    if (!price)
      return res.status(400).send({ error: "product price is required..!" });

    console.log(req.file);

    console.log(req.files);

    res.status(201).send({ success: "product was created successfully..!" });
  } catch (error) {
    res.status(500).send({ error: "500 : internal server error..!" });
    console.log(`createProduct: from productController ${error.message}`);
  }
};

module.exports = { createProduct };
