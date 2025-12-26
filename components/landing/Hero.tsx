'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { ArrowRight } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { getUIText } from '@/lib/i18n';

export const Hero: React.FC = () => {
  const { language } = useAppStore();
  const router = useRouter();

  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center pt-20 px-4 md:px-8 overflow-hidden bg-brand-bg">
      
      {/* Background Decor Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-orange-200/20 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left: Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center lg:text-left z-10"
        >
          <div className="inline-block px-4 py-1.5 mb-6 bg-orange-100 text-brand-primary rounded-full text-sm font-bold tracking-wide">
            {getUIText('landingHeroTag', language)}
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-text leading-[1.2] mb-6">
            {getUIText('landingHeroTitlePart1', language)} <br />
            <span className="text-brand-primary relative">
              {getUIText('landingHeroTitlePart2', language)}
              <svg className="absolute w-full h-3 bottom-1 left-0 -z-10 text-orange-200/60" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </h1>
          
          <p className="text-lg text-brand-subtext mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
            {getUIText('landingHeroDescription', language)}
          </p>

          <div className="flex justify-center lg:justify-start">
            <Button href="/situation">
              {getUIText('homeStartButton', language)} <ArrowRight size={18} />
            </Button>
          </div>
        </motion.div>

        {/* Right: Spline 3D Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative w-full h-[500px] lg:h-[600px] flex items-center justify-center"
        >
           {/* The Iframe Container */}
           <div className="w-full h-full rounded-3xl overflow-hidden shadow-lg bg-white/50 backdrop-blur-sm border border-white/20 relative">
             <div className="absolute top-4 left-6 z-10 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-500">
                {getUIText('landingInteractivePreview', language)}
             </div>
             <iframe 
                src='https://my.spline.design/happyrobotbutton-QIi7QPcb7JZZ9mTqDlAPlphF/' 
                frameBorder='0' 
                width='100%' 
                height='100%'
                className="w-full h-full"
                title="Spline 3D Robot"
                allow="autoplay; fullscreen"
             />
             {/* 투명한 클릭 영역 (중앙 하단) */}
             <button
               onClick={() => router.push('/situation')}
               className="absolute bottom-[25%] left-1/2 transform -translate-x-1/2 w-[200px] h-[60px] md:w-[240px] md:h-[70px] bg-transparent cursor-pointer z-20 hover:opacity-80 transition-opacity"
               aria-label={getUIText('homeStartButton', language)}
             />
           </div>
        </motion.div>
      </div>
    </section>
  );
};

