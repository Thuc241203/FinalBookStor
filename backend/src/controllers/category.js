import Category from "../models/category.js";
export const getAll = async (req, res) => {
  try {
    const result = await Category.find();
    if (result.length == 0) {
      return res.status(400).json({
        message: "Category not found",
      });
    }
    return res.status(200).json({
      message: "Get all product successfully",
      result,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};
export const get = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findById(id);
    if (!category) throw new Error("Category not found");
    return res.status(200).json({
      message: "Get category successfully",
      category,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
export const create = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    if (!category) throw new Error("Create failed category");
    return res.status(200).json({
      message: "Create the category successfully",
      category,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
export const update = async (req, res) => {
  try {
    const categoryID = req.params.id;
    const updateCategory = await Category.findOneAndUpdate(
      { _id: categoryID },
      req.body,
      { new: true }
    );
    if (!updateCategory) {
      return res.sendSatus(404);
    }
    return res.status(200).json({
      message: 'update category successfully',
      updateCategory
    })
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
export const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }
    if (!category.isDeleteable) {
      return res.status(400).json({
        message: "You cannot delete",
      });
    }
    return res.status(200).json({
      message: "Delete category successfully",
    });
  } catch (error) {
    return res.status(400).json({ message: "Delete failed Category" });
  }
};
