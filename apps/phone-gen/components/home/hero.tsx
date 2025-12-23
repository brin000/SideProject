import { Country } from "@/data/countries";
import { useTranslations } from "next-intl";

interface HeroProps {
  country: Country;
}

const Hero = ({ country }: HeroProps) => {
  const t = useTranslations();

  const countryName = t(`app.countries.${country.code.toUpperCase()}.name`);

  return (
    <div className="relative pt-4 mx-auto w-full max-w-4xl text-center px-4">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100/50 via-blue-100/50 to-purple-100/50 blur-3xl" />
      </div>

      <h1 className="mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent md:text-5xl lg:text-6xl">
        {t("app.hero.title", { country: countryName })}
      </h1>
      <p className="mx-auto mb-8 max-w-3xl text-base leading-relaxed text-gray-600/90 sm:text-lg md:text-xl md:leading-relaxed lg:max-w-2xl lg:leading-normal">
        {t("app.hero.description", { country: countryName })}
      </p>

      <div className="absolute -left-4 -top-4 -z-10 h-72 w-72 bg-purple-200 opacity-30 blur-3xl" />
      <div className="absolute -bottom-4 -right-4 -z-10 h-72 w-72 bg-blue-200 opacity-30 blur-3xl" />
    </div>
  );
};

export default Hero;
