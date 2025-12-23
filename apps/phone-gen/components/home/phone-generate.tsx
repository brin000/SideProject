"use client";

import { Country } from "@/data/countries";
import { Button } from "@repo/ui/components/button";
import { Sparkles, Loader2 } from "lucide-react";
import CopyButton from "./copy-button";
import { generateRandomNumbers, GenerateResult } from "@/lib/phoneGenerator";
import { useState } from "react";
import { toast } from "@repo/ui/hooks/use-toast";
import { useTranslations } from "next-intl";

interface PhoneGeneratorProps {
  countryCode: number;
  country: Country;
  phoneNumbers: GenerateResult;
}

const PhoneGenerator = ({ country, phoneNumbers }: PhoneGeneratorProps) => {
  const [generatedNumbers, setGeneratedNumbers] =
    useState<GenerateResult | null>(phoneNumbers);
  const [isLoading, setIsLoading] = useState(false);

  const t = useTranslations();


  const handleGenerateNewNumbers = async () => {
    try {
      setIsLoading(true);
      const newNumbers = await generateRandomNumbers(country.code, 5);
      if (!newNumbers) {
        throw new Error("Failed to generate phone numbers");
      }
      setGeneratedNumbers(newNumbers);
    } catch (error) {
      console.error("Error generating numbers:", error);
      toast({
        description: "Failed to generate numbers",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const countryName = t(`app.countries.${country.code.toUpperCase()}.name`);

  return (
    <section className="rounded-2xl border border-gray-200  p-10 shadow-md hover:shadow-xl transition-all duration-300 space-y-6 backdrop-blur-sm bg-white/80">
      <header className="space-y-4">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text ">
          {t("app.home.title", { country: countryName })}
        </h2>
        <p className="text-base text-gray-700 italic font-medium">
          {t("app.slug.note")}
        </p>

        <Button
          size='lg'
          className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
          variant="default"
          onClick={handleGenerateNewNumbers}
          aria-label={`Generate new ${country.name} phone numbers`}
          tabIndex={0}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Sparkles className="size-4" />
          )}
          {t("app.slug.button")}
        </Button>
      </header>

      <div className="space-y-4 mt-4">
        {generatedNumbers?.numbers.map((number, index) => (
          <div
            key={`phone-${index}`}
            className="group flex items-center justify-between rounded-xl border border-gray-100 bg-gradient-to-r from-purple-50 to-blue-50 px-6 py-5 transition-all hover:border-gray-200 shadow-inner"
            role="button"
            tabIndex={0}
            aria-label={`Copy phone number ${number}`}
          >
            <span className="font-mono text-xl text-purple-700 font-semibold">
              {number}
            </span>
            <CopyButton text={number} />
          </div>
        ))}
      </div>

      <footer className="mt-6 text-base text-gray-700 italic font-medium text-center">
        {t("app.slug.generationTime", { time: generatedNumbers?.timeTaken })}
      </footer>
    </section>
  );
};

export default PhoneGenerator;
