import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
const nextConfig: NextConfig = {
  /* config options here */
  // output: 'export',
  // distDir: 'dist',
};

export default withNextIntl(nextConfig);
