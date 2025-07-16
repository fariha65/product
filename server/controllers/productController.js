import Product from "../models/Product.js";
import Category from "../models/Category.js";
import { generateProductCode } from "../utils/generateProductCode.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, discount, image, status, category } = req.body;

    const categoryExists = await Category.findById(category);
    if (!categoryExists) return res.status(400).json({ error: "Invalid category" });

    const productCode = generateProductCode(name);

    const existingCode = await Product.findOne({ productCode });
    if (existingCode) return res.status(400).json({ error: "Product code conflict, try again" });

    const product = new Product({
      name,
      description,
      price,
      discount,
      image,
      status,
      category,
      productCode,
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: "Create product failed", details: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, description, discount } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { status, description, discount },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: "Update failed", details: err.message });
  }
};


export const getProducts = async (req, res) => {
  try {
    const { category, search } = req.query;

    const query = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.name = new RegExp(search, "i"); // case-insensitive search
    }

    const products = await Product.find(query).populate("category");

    const result = products.map((p) => {
      const finalPrice = p.price - (p.price * p.discount) / 100;

      return {
        ...p.toObject(),
        finalPrice: parseFloat(finalPrice.toFixed(2)),
      };
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Fetch failed", details: err.message });
  }
};
