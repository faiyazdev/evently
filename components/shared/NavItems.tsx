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
            className={`
              p-medium-16 uppercase font-sans transition-colors
              ${
                isActive
                  ? "text-primary font-bold"
                  : "text-foreground hover:text-foreground"
              }
            `}
            key={label}
          >
            <Link href={route} className="block">
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
