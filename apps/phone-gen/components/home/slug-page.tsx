import { getCountryByPath } from "@/data/countries";
import { generateRandomNumbers, getCountryCode } from "@/lib/phoneGenerator";
import { notFound } from "next/navigation";
import Hero from "./hero";
import { Suspense } from "react";
import PhoneGenerate from "./phone-generate";
import { getTranslations } from "next-intl/server";

const SlugPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;
  const country = getCountryByPath(slug);

  if (!country) {
    notFound();
  }

  const countryCode = await getCountryCode(country.code);
  const phoneNumbers = await generateRandomNumbers(country.code, 5);
  const t = await getTranslations();

  const phoneFormat = `app.countries.${country.code.toUpperCase()}`;

  const countryName = t(`app.countries.${country.code.toUpperCase()}.name`);

  return (
    <>
      <Hero country={country} />

      <div className="container mx-auto max-w-5xl px-6 py-8 flex flex-col gap-10">
        <Suspense
          key={Math.random()}
          fallback={
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          }
        >
          <PhoneGenerate
            countryCode={countryCode}
            country={country}
            phoneNumbers={phoneNumbers}
          />
        </Suspense>

        <section
          className="rounded-2xl border border-gray-200 bg-white p-10 shadow-md hover:shadow-xl transition-all duration-300 space-y-6 backdrop-blur-sm"
          aria-labelledby="format-heading"
        >
          <h2
            className="text-3xl font-bold text-gray-900 border-b pb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text"
            id="format-heading"
          >
            {t('app.slug.format.title', { country: countryName })}
          </h2>
          <div className="space-y-4">
            <p className="text-base text-gray-700 font-medium">
              {t(`${phoneFormat}.description`)}
            </p>
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-xl border border-gray-100 shadow-inner">
              <code className="font-mono text-purple-700 text-xl font-semibold">
                {country.phoneFormat.format}
              </code>
            </div>
            <ul className="space-y-4 list-none">
              {country.phoneFormat.rules.map((_, index) => (
                <li key={index} className="pl-10 relative group">
                  <span
                    className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 group-hover:scale-125 transition-all duration-300 shadow-md"
                    aria-hidden="true"
                  ></span>
                  <p className="text-gray-700 text-lg leading-relaxed hover:text-gray-900 transition-colors duration-200">
                    {t(`${phoneFormat}.rules.${index}`)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className="rounded-2xl border border-gray-200  p-10 shadow-md hover:shadow-xl transition-all duration-300 space-y-6 backdrop-blur-sm bg-white/80"
          aria-labelledby="operators-heading"
        >
          <h2
            className="text-3xl font-bold text-gray-900 border-b pb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text"
            id="operators-heading"
          >
            {t('app.slug.operators.title', { country: countryName })}
          </h2>
          <ul className="space-y-8 list-none">
            {country.operators.map((operator, index) => (
              <li key={index} className="pl-10 relative group">
                <span
                  className="absolute left-0 top-3 w-4 h-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 group-hover:scale-125 transition-all duration-300 shadow-md"
                  aria-hidden="true"
                ></span>
                <h3 className="font-bold text-gray-900 text-xl mb-3 group-hover:text-purple-700 transition-colors duration-200">
                  {operator.name}
                </h3>
                <p className="text-gray-700 text-lg font-medium">
                  {t('app.slug.operators.prefixCodes')}: <span className="text-blue-600">{operator.prefixCodes}</span>
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section
          className="rounded-2xl border border-gray-200 bg-white p-10 shadow-md hover:shadow-xl transition-all duration-300 space-y-6 backdrop-blur-sm"
          aria-labelledby="virtual-heading"
        >
          <h2
            className="text-3xl font-bold text-gray-900 border-b pb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text"
            id="virtual-heading"
          >
            {t('app.slug.virtual.title', { country: countryName })}
          </h2>
          <div className="space-y-8">
            <p className="text-gray-700 leading-relaxed text-lg font-medium">
              {t('app.slug.virtual.description', { country: countryName })}
            </p>
            <ul className="grid gap-4 text-gray-700">
              <li className="flex items-center space-x-3 group">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 group-hover:scale-150 transition-transform duration-300"></span>
                <span className="text-lg leading-relaxed group-hover:text-gray-900 transition-colors duration-200">
                  {t('app.slug.virtual.services.business')}
                </span>
              </li>
              <li className="flex items-center space-x-3 group">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 group-hover:scale-150 transition-transform duration-300"></span>
                <span className="text-lg leading-relaxed group-hover:text-gray-900 transition-colors duration-200">
                  {t('app.slug.virtual.services.cloud')}
                </span>
              </li>
              <li className="flex items-center space-x-3 group">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 group-hover:scale-150 transition-transform duration-300"></span>
                <span className="text-lg leading-relaxed group-hover:text-gray-900 transition-colors duration-200">
                  {t('app.slug.virtual.services.temporary')}
                </span>
              </li>
              <li className="flex items-center space-x-3 group">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 group-hover:scale-150 transition-transform duration-300"></span>
                <span className="text-lg leading-relaxed group-hover:text-gray-900 transition-colors duration-200">
                  {t('app.slug.virtual.services.international')}
                </span>
              </li>
            </ul>
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl border border-gray-100 shadow-inner">
              <p className="text-base text-gray-700 italic font-medium">
                {t('app.slug.virtual.note', { country: countryName })}
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SlugPage;
