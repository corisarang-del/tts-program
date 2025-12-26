'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { Button } from './Button';
import { useAppStore } from '@/lib/store';
import { getUIText } from '@/lib/i18n';

export const Footer: React.FC = () => {
  const { language } = useAppStore();

  return (
    <footer className="pt-20 pb-12 bg-white">
      <div className="container mx-auto px-4">
        
        {/* Social Proof Box */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-orange-50 to-white rounded-[2rem] p-12 text-center shadow-inner border border-white mb-24 max-w-4xl mx-auto"
        >
            <div className="w-16 h-16 bg-green-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-200 rotate-3">
                <Check className="text-white w-8 h-8" strokeWidth={3} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{getUIText('landingSocialProofTitle', language)}</h2>
            <p className="text-gray-500 max-w-lg mx-auto">
                {getUIText('landingSocialProofDesc', language)}
            </p>
        </motion.div>

        {/* Final CTA */}
        <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-8 flex items-center justify-center gap-3">
                {getUIText('landingCtaTitle', language)} 
            </h3>
            <p className="text-gray-500 mb-8">{getUIText('landingCtaSubtitle', language)}</p>
            <Button href="/situation" className="mx-auto text-lg px-10 py-4">
                {getUIText('landingCtaButton', language)} <Sparkles size={20} />
            </Button>
            <p className="mt-8 text-xs text-gray-400">
                {getUIText('landingCtaDisclaimer', language)}
            </p>
        </div>

        <div className="mt-20 pt-8 border-t border-gray-200 text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} QuickTalk. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

