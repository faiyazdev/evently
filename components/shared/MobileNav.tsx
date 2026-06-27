import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import NavItems from "./NavItems";
import { Separator } from "../ui/separator";

const MobileNav = () => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <Image
            src="/assets/icons/menu.svg"
            width={24}
            height={24}
            className="cursor-pointer dark:invert transition-all"
            alt="navbar menu"
          />
        </SheetTrigger>

        {/* Added dynamic close button targeting override via [&>button] */}
        <SheetContent
          className="flex flex-col gap-6 md:hidden 
                     [&>button]:text-neutral-500 [&>button]:dark:text-neutral-400 
                     [&>button]:hover:bg-neutral-100 [&>button]:dark:hover:bg-neutral-800
                     [&>button]:bg-transparent [&>button]:rounded-md [&>button]:p-1 transition-all"
        >
          <SheetHeader className="text-left">
            {/* WHITE MODE LOGO */}
            <Image
              src="/assets/images/logo.svg"
              width={128}
              height={38}
              alt="navbar logo"
              className="dark:hidden object-contain"
            />

            {/* DARK MODE LOGO */}
            <div className="w-32 h-10 hidden dark:block">
              <svg
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 220 50"
              >
                <g
                  transform="translate(8, 7)"
                  fill="none"
                  stroke="oklch(0.6724 0.1308 38.7559)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="6" width="26" height="26" rx="5" />
                  <path d="M22 2v6M8 2v6M2 14h26" />
                  <circle
                    cx="20"
                    cy="22"
                    r="2"
                    fill="oklch(0.6724 0.1308 38.7559)"
                    stroke="none"
                  />
                </g>
                <text
                  x="48"
                  y="35"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  fontSize="32"
                  fontWeight="700"
                  fill="oklch(0.8074 0.0142 93.0137)"
                  letterSpacing="1"
                >
                  Evently
                </text>
              </svg>
            </div>

            <Separator className="border border-gray-100 dark:border-neutral-800 my-4" />

            <NavItems />
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
