import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";

function Header() {
  return (
    <header className="wrapper flex-between gap-5 px-6 py-4 border-b">
      {/* Brand Logo - Light and Dark variants consolidated under one Link */}
      <Link href="/" className="w-44 h-11 flex items-center">
        {/* WHITE MODE LOGO */}
        <Image
          src="/assets/images/logo.svg"
          width={128}
          height={38}
          alt="Evently Logo"
          className="dark:hidden object-contain"
        />

        {/* DARK MODE LOGO */}
        <svg
          className="hidden dark:block w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 220 50"
        >
          {/* ICON: Universal Event/Calendar Indicator */}
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
            {/* Little focal notification indicator */}
            <circle
              cx="20"
              cy="22"
              r="2"
              fill="oklch(0.6724 0.1308 38.7559)"
              stroke="none"
            />
          </g>

          {/* TEXT: Scaled text size with tight tracking spacing */}
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
      </Link>

      {/* Main Navigation (Visible when Signed In on Desktop) */}
      <Show when="signed-in">
        <nav className="hidden md:block">
          <NavItems />
        </nav>
      </Show>

      {/* Dynamic Actions Interface */}
      <div className="flex items-center">
        <Show when="signed-out">
          <SignInButton mode="redirect">
            <Link
              href="/sign-in"
              className="rounded-md bg-black px-4 py-2 text-white transition hover:bg-gray-800"
            >
              Sign In
            </Link>
          </SignInButton>
        </Show>

        <Show when="signed-in">
          <div className="flex items-center gap-5">
            <UserButton />
            <MobileNav />
          </div>
        </Show>
      </div>
    </header>
  );
}

export default Header;
