"use client";
import { ChangeEvent } from "react";
import { Input } from "../ui/input";
import { usePathname, useRouter } from "next/navigation";

const Search = ({ placeholder = "title ....." }: { placeholder?: string }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    const params = new URLSearchParams();
    const url = new URL(window.location.href);
    if (e.target.value) {
      params.set("query", e.target.value);
    } else {
      params.delete("query");
    }
    url.search = params.toString();
    router.replace(pathname + url.search, { scroll: false });
  };

  return (
    <div>
      <Input type="text" placeholder={placeholder} onChange={handleChange} />
    </div>
  );
};

export default Search;
