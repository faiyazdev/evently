"use server";

import { CreateCategoryParams } from "@/types";
import Category from "../db/models/category.model";
import connectToDatabase from "../db";

export const createCategory = async ({
  categoryName,
}: CreateCategoryParams) => {
  try {
    await connectToDatabase();
    const newCategory = await Category.create({ name: categoryName });
    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    console.error("Error creating Category:", error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    await connectToDatabase();
    const categories = await Category.find().lean();
    return categories;
  } catch (error) {
    console.error("Error creating Category:", error);
    throw error;
  }
};
