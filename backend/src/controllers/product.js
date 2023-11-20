import Product from "../models/product.js";
import Category from "../models/category.js";
import { productSchema } from "../schemas/product.js";

export const getAll = async (req, res) => {
  const {
    _page = 1,
    _limit = 12,
    _sort = "createdAt",
    _order = "asc",
    _expand,
    _filterField,
    _filterValue,
    _search,
    _category,
  } = req.query;

  const options = {
    page: _page,
    limit: _limit,
    sort: { [_sort]: _order == "desc" ? -1 : 1 },
  };
  const populateOptions = _expand
    ? [{ path: "categoryId", select: "name" }]
    : [];
  try {
    const newQuery = {};
    if (_category) {
      newQuery.categoryId = _category;
    }
    if (_search) {
      newQuery.name = { $regex: _search, $options: "i" };
      console.log("search name: ", newQuery.name);
    }
    if (_filterField && _filterValue) {
      const operatorMap = {
        gte: "$gte",
        gt: "$gt",
        lt: "$lt",
        lte: "$lte",
      };

      const [field, operator] = _filterField.split("_");
      if (operatorMap[operator]) {
        newQuery[field] = { [operatorMap[operator]]: parseFloat(_filterValue) };
      } else {
        newQuery[_filterField] = _filterValue;
      }
    }

    const result = await Product.paginate(newQuery, {
      ...options,
      populate: populateOptions,
    });
    if (result.docs.length === 0) throw new Error("Không tìm thấy sản phẩm!");
    const response = {
      products: result.docs,
      pagination: {
        currentPage: result.page,
        totalPages: result.totalPages,
        totalItems: result.totalDocs,
      },
    };
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  const {
    _page = 1,
    _limit = 12,
    _sort = "createdAt",
    _order = "asc",
    _expand,
    _filterField,
    _filterValue,
    _search,
  } = req.query;

  const options = {
    page: _page,
    limit: _limit,
    sort: { [_sort]: _order === "desc" ? -1 : 1 },
  };
  const populateOptions = _expand
    ? [{ path: "categoryId", select: "name" }]
    : [];

  try {
    const newQuery = {};

    if (_search) {
      newQuery.name = { $regex: _search, $options: "i" };
    }

    if (_filterField && _filterValue) {
      const operatorMap = {
        gte: "$gte",
        gt: "$gt",
        lt: "$lt",
        lte: "$lte",
      };

      const [field, operator] = _filterField.split("_");
      if (operatorMap[operator]) {
        newQuery[field] = { [operatorMap[operator]]: parseFloat(_filterValue) };
      } else {
        newQuery[_filterField] = _filterValue;
      }
    }

    const result = await Product.paginate(newQuery, {
      ...options,
      populate: populateOptions,
    });

    if (result.docs.length === 0) {
      throw new Error("Không tìm thấy sản phẩm!");
    }

    const response = {
      products: result.docs,
      pagination: {
        currentPage: result.page,
        totalPages: result.totalPages,
        totalItems: result.totalDocs,
      },
    };

    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const get = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "categoryId",
      "-__v"
    );
    const idProductSilimar = product.categoryId.products;
    const products = await Product.find({
      _id: { $in: idProductSilimar },
    });
    if (!product) throw new Error("Product không tìm thấy");
    return res.status(200).json({
      message: "đã lấy product thành công",
      data: product,
      listProductSimilar: products,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
export const create = async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((message) => ({ message }));
      return res.status(400).json({ errors });
    }
    const product = await Product.create(req.body);
    const CategoryId = await Category.findById(product.categoryId);
    if (!CategoryId) {
      return res.status(404).json({
        message: "Không tìm thấy CategoryId ",
      });
    }
    await Category.findByIdAndUpdate(product.categoryId, {
      $addToSet: {
        products: product._id,
      },
    });

    return res.status(200).json({
      message: "tạo thành công product",
      product,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "tạo không thành công product", error: error.message });
  }
};
export const update = async (req, res) => {
  try {
    const productId = req.params.id;
    const updateProduct = await Product.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updateProduct) {
      return res.status(400).json({
        message: "Cập nhật sản phẩm thất bại",
      });
    }
    const oldCategoryId = updateProduct.categoryId;
    await Category.findByIdAndUpdate(oldCategoryId, {
      $pull: { products: productId },
    });
    const newCategoryId = req.body.categoryId;
    if (newCategoryId) {
      await Category.findByIdAndUpdate(newCategoryId, {
        $addToSet: { products: productId },
      });
    }
    return res.status(200).json({
      message: "cập nhập product thành công",
      updateProduct,
    });
  } catch (error) {
    return res.status(400).json({
      message: "cập nhập không thành công product",
      error: error.message,
    });
  }
};
export const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOneAndDelete(id);
    await Category.findByIdAndUpdate(product.categoryId, {
      $pull: { products: product.id },
    });
    if (!product) {
      return res.status(200).json({
        message: "không tìm thấy Product",
      });
    }
    return res.status(200).json({
      message: "Delete product successfully",
      data: product,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Delete failed product", error: error.message });
  }
};
