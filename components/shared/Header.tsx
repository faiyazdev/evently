import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";

function Header() {
  return (
    <header className="wrapper flex-between gap-5 px-6 py-4 border-b">
      {/* Logo */}
      <div className="flex items-center">
        <Image
          src="/assets/images/logo.svg"
          width={128}
          height={38}
          className=""
          alt="Evently Logo"
        />
      </div>

      <Show when="signed-in">
        <nav className="hidden md:block">
          <NavItems />
        </nav>
      </Show>

      {/* Actions */}
      <div>
        <Show when="signed-out">
          <SignInButton mode="redirect">
            <Link
              href={"/sign-in"}
              className="rounded-md bg-black px-4 py-2 text-white transition hover:bg-gray-800"
            >
              Sign In
            </Link>
          </SignInButton>
        </Show>

        <Show when="signed-in">
          <div className="flex gap-5">
            <UserButton />
            <MobileNav />
          </div>
        </Show>
      </div>
    </header>
  );
}

export default Header;
