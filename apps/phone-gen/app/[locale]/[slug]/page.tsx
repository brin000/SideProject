import { countries, getCountryByPath } from "@/data/countries";
import { Metadata } from "next";
import SlugPage from "@/components/home/slug-page";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export const revalidate = 3600; // invalidate every hour

export async function generateStaticParams() {
  return countries.map((country) => ({
    slug: `${country.path}-phone-number-generator`,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const country = getCountryByPath(slug);
  const t = await getTranslations();
  const countryName = t(`app.countries.${country?.code.toUpperCase()}.name`);

  if (!country) {
    return {
      title: t('notFound'),
    };
  }

  return {
    title: t('seo.slug.title', { country: countryName }),
    description: t('seo.slug.description', { country: countryName }),
    keywords: t('seo.slug.keywords', { country: countryName }),
    openGraph: {
      title: t('seo.slug.openGraph.title', { country: countryName }),
      description: t('seo.slug.openGraph.description', { country: countryName }),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t('seo.slug.twitter.title', { country: countryName }),
      description: t('seo.slug.twitter.description', { country: countryName }),
    },
  };
}

export default async function Page({ params }: Props) {
  return <SlugPage params={params} />;
}
