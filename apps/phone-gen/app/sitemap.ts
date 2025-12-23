import { countries } from "@/data/countries";
import { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/constants";
import { routing, getPathname } from "@/i18n/routing";

const host = BASE_URL;
type Href = Parameters<typeof getPathname>[0]["href"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries = countries.flatMap(
    (country) => getEntries(`${country.path}-phone-number-generator`)
  );

  return [...getEntries("/"), ...entries];
}

function getEntries(href: Href) {
  return routing.locales.map((locale) => ({
    url: getUrl(href, locale),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((cur) => [cur, getUrl(href, cur)])
      ),
    },
  }));
}

function getUrl(href: Href, locale: (typeof routing.locales)[number]) {
  const pathname = getPathname({ locale, href });
  return host + pathname;
}
