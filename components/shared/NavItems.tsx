"use client";
import { navLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItems = () => {
  const pathName = usePathname();
  return (
    <ul className="flex flex-col gap-4 mt-5 md:mt-0 md:flex-row md:gap-6">
      {navLinks.map(({ label, route }) => {
        const isActive = pathName === route;
        return (
          <li
            className={`${isActive ? "text-blue-500" : "text-black"} p-medium-16 uppercase font-roboto`}
            key={label}
          >
            <Link href={route}>{label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
