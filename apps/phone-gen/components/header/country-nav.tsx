"use client";

import {Link, usePathname} from '@/i18n/routing'
import { countries } from "@/data/countries";
import { cn } from "@repo/ui/lib/utils";
import { useTranslations } from 'next-intl';
import { ScrollBar } from '@repo/ui/components/scroll-area';
import { ScrollArea } from '@repo/ui/components/scroll-area';

interface NavigationLinkProps {
  href: string;
  ariaLabel: string;
  title: string;
  isActive: boolean;
  children: React.ReactNode;
}

const NavigationLink = ({
  href,
  ariaLabel,
  title,
  isActive,
  children,
}: NavigationLinkProps) => (
  <Link
    href={href}
    aria-label={ariaLabel}
    title={title}
    className={cn(
      "relative px-3 py-2 rounded-lg font-medium text-sm tracking-wide transition-all duration-300",
      "hover:scale-105 hover:shadow-md",
      isActive
        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold shadow-lg shadow-purple-200"
        : "bg-white/80 text-gray-700 hover:bg-white hover:text-purple-700 border border-gray-200"
    )}
    role="menuitem"
  >
    {children}
    {isActive && (
      <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 animate-pulse" />
    )}
  </Link>
);

const CountryNav = () => {
  const pathname = usePathname();

  const t = useTranslations('app');

  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <ul
        className="hidden md:flex items-center gap-3 flex-1 py-2 px-1"
        role="menubar"
      >
        <li className="flex-shrink-0">
          <NavigationLink
            href="/"
            ariaLabel="Navigate to Home"
            title="Generate phone numbers for all supported countries"
            isActive={pathname === "/"}
          >
          {t('nav.home')}
          </NavigationLink>
        </li>
        {countries.map((country) => {
          const countryPath = `/${country.path}-phone-number-generator`;
          return (
            <li key={country.code} className="flex-shrink-0">
              <NavigationLink
                href={countryPath}
                ariaLabel={`Generate ${country.name} phone numbers`}
                title={`${country.name} Phone Number Generator`}
                isActive={pathname === countryPath}
              >
                {t(`countries.${country.code.toUpperCase()}.name`)}
              </NavigationLink>
            </li>
          );
        })}
      </ul>
    </ScrollArea>
  );
};

export default CountryNav;
