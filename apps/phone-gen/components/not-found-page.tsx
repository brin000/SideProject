import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link"; 

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <div className="relative pt-4 pb-20 flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Background Grid Animation */}
      <div className="abso  lute inset-0 -z-10 h-full w-full bg-slate-50 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem]">
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-100/50 to-slate-50/50 backdrop-blur-3xl" />
      </div>

      {/* 404 Image */}
      <div className="relative w-72 h-72 mb-4">
        <Image
          src="/404.svg"
          alt="404 Page Not Found"
          fill
          className="object-contain animate-float"
          priority
        />
      </div>

      {/* Content */}
      <div className="text-center space-y-4 animate-fadeIn">
        <h1 className="text-4xl font-bold text-slate-900">
          {t('title')}
        </h1>
        <p className="text-lg text-slate-600 max-w-md mx-auto">
          {t('description')}
        </p>
      </div>

      {/* Button */}
      <div className="mt-8 animate-fadeIn">
        <Link
          href="/"
          className="group inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-8 py-3 text-sm font-medium text-white transition-all hover:bg-slate-700 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
        >
          <span>{t('returnHome')}</span>
          <svg 
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
