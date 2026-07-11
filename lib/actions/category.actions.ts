"use server";

import { CreateCategoryParams } from "@/types";
import connectToDatabase from "../db";
import { CategoryDto, toCategoryDto } from "../dto/category.dto";
import Category from "../db/models/category.model";
import { unstable_cache } from "next/cache";

export const createCategory = async ({
  categoryName,
}: CreateCategoryParams): Promise<CategoryDto> => {
  try {
    await connectToDatabase();
    const newCategory = await Category.create({ name: categoryName });
    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    console.error("Error creating Category:", error);
    throw error;
  }
};

export const getCategories = unstable_cache(
  async (): Promise<CategoryDto[] | null> => {
    try {
      await connectToDatabase();
      console.count("categories rendered");
      const categories = await Category.find().lean();
      if (!categories) return null;
      return categories.map(toCategoryDto);
    } catch (error) {
      console.error("Error fetching Categories:", error);
      throw error;
    }
  },
  ["categories"],
  {
    tags: ["categories"],
    revalidate: 3600,
  },
);
