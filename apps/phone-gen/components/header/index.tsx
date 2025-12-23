import Image from "next/image";
import Link from "next/link";
import LanguageSwitcher from "../LanguageSwitcher";
import CountryNav from "./country-nav";

const Header = () => {
  return (
    <header
      className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-xs"
      role="banner"
      aria-label="Website Header"
    >
      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <nav
          className="relative flex items-center justify-between"
          role="navigation"
          aria-label="Primary Navigation"
        >
          <Link
            href="/"
            aria-label="Phone Number Generator - Return to Homepage"
            title="Phone Number Generator - Create Phone Numbers for Different Countries"
            className="group flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-300 hover:bg-gray-50/80"
          >
            <div className="relative h-8 w-8">
              <Image
                alt="Phone Number Generator Logo"
                src="/logo.svg"
                fill
                sizes="(max-width: 32px) 100vw"
                className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                priority
              />
            </div>
            <h1
              className="bg-gradient-to-r from-purple-600 via-blue-500 to-blue-600 bg-clip-text text-xl font-extrabold tracking-tight text-transparent sm:text-2xl"
              aria-label="Phone Number Generator"
            >
              Phone Number Generator
            </h1>
          </Link>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
      <div className="mx-auto max-w-7xl py-2 px-4 sm:px-6 lg:px-8 flex">
        <CountryNav />
      </div>
    </header>
  );
};

export default Header;
