'use client';

import dynamic from 'next/dynamic';

// Dynamically load the client App to ensure clean hydration in Next.js
const MainPortfolioApp = dynamic(
  () => import('@/App').then((mod) => mod.App),
  { ssr: false }
);

export default function Home() {
  return <MainPortfolioApp />;
}
