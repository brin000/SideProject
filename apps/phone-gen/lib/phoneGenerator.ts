"use server";

import libphonenumber from "google-libphonenumber";
import { cache } from "react";

const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
const exampleNumberCache = new Map<string, libphonenumber.PhoneNumber>();

export type GenerateResult = {
  numbers: string[];
  timeTaken: string;
} | null;

export const getCountryCode = cache(async (region: string): Promise<number> => {
  return phoneUtil.getCountryCodeForRegion(region.toUpperCase());
});

export const generateRandomNumbers = async (
  region: string,
  count: number
): Promise<GenerateResult> => {
  const countryCode = await getCountryCode(region);
  const normalizedRegion = region.toUpperCase();

  const exampleNumber = await getExampleNumber(normalizedRegion);
  if (!exampleNumber) return null;

  const nationalNumber = exampleNumber.getNationalNumber()?.toString();
  if (!nationalNumber) {
    console.error("Failed to get national number");
    return null;
  }

  const prototypeNumber = new libphonenumber.PhoneNumber();
  prototypeNumber.setCountryCode(countryCode);

  const numbers = new Set<string>();
  const startTime = performance.now();

  const promises = Array(count)
    .fill(null)
    .map(() =>
      generateSingleNumber(
        nationalNumber,
        prototypeNumber,
        normalizedRegion,
        numbers
      )
    );

  await Promise.all(promises);

  const timeTaken = getExecutionTime(startTime);

  if (numbers.size < count) {
    console.error(`Failed to generate ${count} unique numbers`);
  }

  return { numbers: Array.from(numbers), timeTaken };
};

const MAX_ATTEMPTS = 100000000;
const DIGIT_PATTERN = /\d/;
const KEEP_ORIGINAL_PROBABILITY = 0.8;

const getExampleNumber = async (
  region: string
): Promise<libphonenumber.PhoneNumber | null> => {
  if (exampleNumberCache.has(region)) return exampleNumberCache.get(region)!;

  try {
    const example = phoneUtil.getExampleNumberForType(
      region,
      libphonenumber.PhoneNumberType.MOBILE
    );

    if (!example) throw new Error(`No example number for region ${region}`);

    exampleNumberCache.set(region, example);
    return example;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const generateSingleNumber = (
  nationalNumber: string,
  prototypeNumber: libphonenumber.PhoneNumber,
  region: string,
  numbers: Set<string>
): Promise<void> => {
  return new Promise((resolve) => {
    let attempts = 0;

    while (attempts++ < MAX_ATTEMPTS) {
      try {
        const randomNational = generateRandomNational(nationalNumber);
        prototypeNumber.setNationalNumber(Number(randomNational));

        if (!phoneUtil.isValidNumberForRegion(prototypeNumber, region))
          continue;

        const formattedNumber = phoneUtil.format(
          prototypeNumber,
          libphonenumber.PhoneNumberFormat.INTERNATIONAL
        );

        if (!numbers.has(formattedNumber)) {
          numbers.add(formattedNumber);
          return resolve();
        }
      } catch (error) {
        console.warn("Invalid number generation:", error);
      }
    }
    resolve();
  });
};

const generateRandomNational = (nationalNumber: string): string => {
  return nationalNumber
    .split("")
    .map((char) =>
      !DIGIT_PATTERN.test(char)
        ? char
        : Math.random() < KEEP_ORIGINAL_PROBABILITY
          ? char
          : Math.floor(Math.random() * 10)
    )
    .join("");
};

const getExecutionTime = (startTime: number): string => {
  const executionTime = performance.now() - startTime;
  return executionTime.toFixed(2);
};
