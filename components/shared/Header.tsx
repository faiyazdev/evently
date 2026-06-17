import Image from "next/image";

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
        <button
          type="button"
          className="rounded-md bg-black px-4 py-2 text-white transition hover:bg-gray-800"
        >
          Sign In
        </button>
      </div>
    </header>
  );
}

export default Header;
