"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategoryDto } from "@/lib/dto/category.dto";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const CategoryFilter = ({
  categories,
}: {
  categories: CategoryDto[] | null;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  return (
    <Select
      onValueChange={(val) => {
        const newUrl =
          val && val !== "All"
            ? formUrlQuery({
                params: searchParams.toString(),
                key: "category",
                value: val,
              })
            : removeKeysFromQuery({
                params: searchParams.toString(),
                keysToRemove: ["category"],
              });

        const currentUrl = window.location.pathname + window.location.search;

        if (newUrl !== currentUrl) {
          router.replace(newUrl, { scroll: false });
        }
      }}
    >
      <SelectTrigger id="select-category" className="min-w-30">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent position="item-aligned">
        <SelectItem value="All">All</SelectItem>
        {categories &&
          categories.length > 0 &&
          categories?.map((category) => {
            return (
              <SelectItem key={category._id} value={category.name}>
                {category.name}
              </SelectItem>
            );
          })}
      </SelectContent>
    </Select>
  );
};

export default CategoryFilter;
