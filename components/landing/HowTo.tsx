'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Globe, MessageCircle, FileText } from 'lucide-react';
import { StepItem } from '@/types/landing';
import { useAppStore } from '@/lib/store';
import { getUIText } from '@/lib/i18n';

export const HowTo: React.FC = () => {
  const { language } = useAppStore();

  const steps: StepItem[] = useMemo(() => [
    {
      step: 1,
      title: getUIText('landingHowToStep1Title', language),
      description: getUIText('landingHowToStep1Desc', language),
      icon: Globe,
      iconColor: 'text-blue-500'
    },
    {
      step: 2,
      title: getUIText('landingHowToStep2Title', language),
      description: getUIText('landingHowToStep2Desc', language),
      icon: MessageCircle,
      iconColor: 'text-purple-500'
    },
    {
      step: 3,
      title: getUIText('landingHowToStep3Title', language),
      description: getUIText('landingHowToStep3Desc', language),
      icon: FileText,
      iconColor: 'text-brand-primary'
    }
  ], [language]);

  return (
    <section className="py-24 relative overflow-hidden bg-brand-bg">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <span className="text-blue-600 font-bold text-sm tracking-widest uppercase mb-2 block">{getUIText('landingHowToTag', language)}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-text">{getUIText('landingHowToTitle', language)}</h2>
          <p className="mt-4 text-brand-subtext">{getUIText('landingHowToSubtitle', language)}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connection Line (Desktop) */}
            <div className="hidden md:block absolute top-[28%] left-[16%] right-[16%] h-0.5 border-t-2 border-dashed border-gray-200 -z-10"></div>

            {steps.map((step, index) => (
            <motion.div 
                key={step.step}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-3xl p-8 flex flex-col items-center text-center shadow-lg border border-gray-100 relative group hover:-translate-y-2 transition-transform duration-300"
            >
                <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary font-bold text-lg mb-6 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                    {step.step}
                </div>
                
                <div className="mb-6 p-4 bg-gray-50 rounded-full">
                    <step.icon size={40} className={step.iconColor} />
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.description}</p>
            </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

