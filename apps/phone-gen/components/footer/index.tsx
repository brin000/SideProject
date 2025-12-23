import { useTranslations } from "next-intl";
import Link from "next/link";

const Footer = () => {
  const t = useTranslations();

  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="w-full py-6 text-center text-sm text-gray-600 border-t border-gray-200"
      role="contentinfo"
      aria-label="Site Footer"
    >
      <div className="container mx-auto">
        <div
          className="flex items-center justify-center gap-1"
          itemScope
          itemType="http://schema.org/Organization"
        >
          <span itemProp="copyrightYear">{currentYear} &copy;</span>
          <Link
            href="/"
            className="text-gray-700 hover:text-gray-900 transition-colors"
            aria-label="Return to Phone Number Generator Homepage"
            tabIndex={0}
            title="Phone Number Generator - Create Valid Phone Numbers"
            itemProp="url"
            rel="noopener noreferrer"
          >
            <span itemProp="name">Phone Number Generator</span>
          </Link>
          <span>. All rights reserved.</span>
        </div>
        <p className="mt-2 text-xs text-gray-500" itemProp="disclaimer">
          {t("app.footer.disclaimer")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
