import { RemoveUrlQueryParams, UrlQueryParams } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const url = new URL(window.location.href);
  url.search = params;
  url.searchParams.set(key, value!);
  return url.pathname + url.search;
}

export function removeKeysFromQuery({
  params,
  keysToRemove,
}: RemoveUrlQueryParams) {
  const url = new URL(window.location.href);
  url.search = params;
  keysToRemove.forEach((key) => {
    url.searchParams.delete(key);
  });
  return url.pathname + url.search;
}
