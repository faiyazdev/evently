"use server";

import { CreateCategoryParams } from "@/types";
import { connectToDatabase } from "../db";
import Category from "../db/models/category.model";

export const createCategory = async ({
  categoryName,
}: CreateCategoryParams) => {
  try {
    await connectToDatabase();

    const newCategory = await Category.create({ name: categoryName });
    return newCategory.toObject();
  } catch (error) {
    console.error("Error creating Category:", error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    await connectToDatabase();

    const categories = await Category.find();
    console.log(categories);
    return categories;
  } catch (error) {
    console.error("Error creating Category:", error);
    throw error;
  }
};
