import { CategoryType } from "../db/models/category.model";

export type CategoryDto = {
  _id: string;
  name: string;
};

export function toCategoryDto(category: CategoryType): CategoryDto {
  return {
    _id: category._id.toString(),
    name: category.name,
  };
}
