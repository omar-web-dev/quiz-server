import createHttpError from "http-errors";
import Category from "../models/CategoryModel";

export const addCategoryService = async (allCategory: any) => {
  const newCategory = await Category.create(allCategory);
  return newCategory;
};

export const getAllCategoryService = async () => {
  const categories = await Category.find({}, { password: 0 });
  const count = await Category.countDocuments();
  return { categories, count };
};

export const deleteCategoryService = async (id: string, userId: string) => {
  const categoryService = await Category.findOne({
    _id: id,
    isDeleted: false,
    seller: userId,
  });
  if (!categoryService) {
    throw new createHttpError.NotFound("Category not found");
  }

  const deleted = await Category.findOneAndUpdate(
    { _id: id, isDeleted: false, seller: userId },
    { isDeleted: true },
    { new: true }
  );
  return deleted;
};
