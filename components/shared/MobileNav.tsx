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
        <SheetTrigger>
          <Image
            src={"/assets/icons/menu.svg"}
            width={24}
            height={24}
            className=""
            alt="navbar menu"
          />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 md:hidden">
          <SheetHeader>
            <Image
              src={"/assets/images/logo.svg"}
              width={128}
              height={38}
              className=""
              alt="navbar logo"
            />
            <Separator className="border border-gray-100" />
            <NavItems />
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
