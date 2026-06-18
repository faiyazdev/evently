import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <header className="wrapper flex-between px-6 py-4 border-b">
      {/* Logo */}
      <div className="flex items-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Evently Logo"
          width={140}
          height={40}
          priority
        />
      </div>

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
          <UserButton />
        </Show>
      </div>
    </header>
  );
}

export default Header;
