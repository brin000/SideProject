'use client';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const languages = {
    en: 'English',
    zh: '中文',
    hi: 'हिंदी', 
    id: 'Bahasa Indonesia',
    ja: '日本語'
  };

  const handleLanguageChange = (value: string) => {
    router.replace(pathname, { locale: value });
  };

  return (
    <Select
      value={locale}
      onValueChange={handleLanguageChange}
    >
      <SelectTrigger className="w-[180px] focus:ring-2 focus:ring-primary">
        <Globe className="mr-2 h-4 w-4" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(languages).map(([code, name]) => (
          <SelectItem 
            key={code} 
            value={code}
            className="cursor-pointer hover:bg-accent"
          >
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}