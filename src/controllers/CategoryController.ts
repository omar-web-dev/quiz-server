import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../interfaces/AuthRequest";
import {
  addCategoryService,
  deleteCategoryService,
  getAllCategoryService,
} from "../services/CategoryService";

export const addCategoryController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const newCategory = req.body;
    const data = await addCategoryService(newCategory);
    res.send({
      success: true,
      data: data,
      message: "Category added successfully",
    });
  } catch (err) {
    return next(err);
  }
};

export const getAllCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await getAllCategoryService();
    res.send({ success: true, data: category });
  } catch (err) {
    return next(err);
  }
};

export const deleteCategoryController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params as { id: string };
    const userId = req.user?._id;
    const data = await deleteCategoryService(id, userId);
    res.send({
      success: true,
      data: data,
      message: "Category deleted successfully",
    });
  } catch (err) {
    return next(err);
  }
};

