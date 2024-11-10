import Product from "../models/product.model.js";
import Joi from "joi";

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    if (!products) {
      res.status(400).json({ success: false, message: "Products not found" });
    }

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// CreateProduct controller
const CreateProduct = async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error(`Error in create product : ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// DeleteProduct controller
const DeleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res
      .status(400)
      .json({ success: false, message: "The product id has not found" });
  }

  try {
    await Product.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(404).json({ success: false, message: "Product not found" });
  }
};

// Update product controller

// schema validation with joi

// Define validation schema with Joi
const updateProductSchema = Joi.object({
  name: Joi.string().min(3).required(),
  price: Joi.number().greater(0).required(),
  image: Joi.string().uri().required(),
});

// Main controller function
const UpdateProducts = async (req, res) => {
  const { id } = req.params;
  const { name, price, image } = req.body;

  // Validate incoming data
  const { error } = updateProductSchema.validate({ name, price, image });
  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }

  try {
    // Check if product exists
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Check if data is identical to avoid unnecessary update
    if (
      existingProduct.name === name &&
      existingProduct.price === price &&
      existingProduct.image === image
    ) {
      return res
        .status(200)
        .json({ success: true, message: "No changes detected" });
    }

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: { name, price, image } },
      { new: true, runValidators: true }
    );

    res
      .status(200)
      .json({
        success: true,
        data: updatedProduct,
        message: "Product Updated",
      });
  } catch (error) {
    handleError(res, error); // Centralized error handler
  }
};

// export part

export { getAllProducts, CreateProduct, UpdateProducts, DeleteProduct };
