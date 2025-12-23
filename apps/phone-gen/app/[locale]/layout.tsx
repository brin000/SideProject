import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Locale, routing } from "@/i18n/routing";
import { PropsWithChildren } from "react";
import BaseLayout from "@/components/base-layout";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  params: { locale: Locale };
};

export async function generateMetadata({ params }: Props) {
  const locale = (await params).locale;

  const t = await getTranslations({ locale, namespace: "seo" });

  return {
    title: t("home.title"),
    description: t("home.description"),
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: PropsWithChildren<Props>) {
  const locale = (await params).locale;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return <BaseLayout locale={locale}>{children}</BaseLayout>;
}
