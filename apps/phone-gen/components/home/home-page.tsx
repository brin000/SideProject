import { countries } from "@/data/countries";
import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Link } from "@/i18n/routing";
import { Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";


const HomePage = () => {
const t = useTranslations();

const countryName = (code: string) => t(`app.countries.${code.toUpperCase()}.name`);

  return (
    <section
      className="container mx-auto max-w-4xl px-4"
      aria-label="Country phone number generators"
    >
      <div className="grid grid-cols-1 gap-8">
        {countries.map((country) => (
          <Card 
            key={country.code}
            className="group relative overflow-hidden border border-gray-200 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-100"
          >
            <CardHeader className="space-y-2">
              <CardTitle>
                <h2
                  className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-2xl font-bold text-transparent"
                  title={t('app.home.title', { country: countryName(country.code) })}
                >
                  {t('app.home.title', { country: countryName(country.code) })}
                </h2>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-gray-600">
                  {t('app.home.description', { country: countryName(country.code) })}
              </p>
            </CardContent>
            <CardFooter>
              <Link
                href={`/${country.path}-phone-number-generator`}
                title={t('app.home.button', { country: countryName(country.code) })}
                className="w-full"
              >
                <Button 
                  variant="default"
                  className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-200 hover:from-purple-700 hover:to-blue-700"
                >
                  <Sparkles className="size-4" />
                  {t('app.home.button', { country: countryName(country.code) })}
                </Button>
              </Link>
            </CardFooter>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
          </Card>
        ))}
      </div>
    </section>
  );
};

export default HomePage;
