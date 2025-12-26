'use client';

import React from 'react';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { HowTo } from '@/components/landing/HowTo';
import { Footer } from '@/components/landing/Footer';
import Header from '@/components/ui/Header';

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text font-sans selection:bg-brand-primary selection:text-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowTo />
        <Footer />
      </main>
    </div>
  );
}
