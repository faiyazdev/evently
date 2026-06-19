function Footer() {
  return (
    <footer className="border-t  wrapper text-foreground-100">
      <div className=" py-6 flex flex-col items-center justify-between  md:flex-row">
        <p className="p-regular-14 ">
          © {new Date().getFullYear()} Evently. All rights reserved.
        </p>

        <nav>
          <ul className="flex items-center gap-6">
            <li>
              <a
                href="#"
                className="p-medium-14  hover:text-black transition-colors"
              >
                Privacy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="p-medium-14  hover:text-black transition-colors"
              >
                Terms
              </a>
            </li>
            <li>
              <a
                href="#"
                className="p-medium-14  hover:text-black transition-colors"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
