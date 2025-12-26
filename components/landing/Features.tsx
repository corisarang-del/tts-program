'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Zap, Rocket, Volume2 } from 'lucide-react';
import { FeatureItem } from '@/types/landing';
import { useAppStore } from '@/lib/store';
import { getUIText } from '@/lib/i18n';

export const Features: React.FC = () => {
  const { language } = useAppStore();

  const features: FeatureItem[] = useMemo(() => [
    {
      id: 1,
      title: getUIText('landingFeatureMinimalClicksTitle', language),
      description: getUIText('landingFeatureMinimalClicksDesc', language),
      icon: Zap,
      color: 'text-orange-500'
    },
    {
      id: 2,
      title: getUIText('landingFeatureInstantResultsTitle', language),
      description: getUIText('landingFeatureInstantResultsDesc', language),
      icon: Rocket,
      color: 'text-pink-500'
    },
    {
      id: 3,
      title: getUIText('landingFeatureVoiceSupportTitle', language),
      description: getUIText('landingFeatureVoiceSupportDesc', language),
      icon: Volume2,
      color: 'text-blue-500'
    }
  ], [language]);

  return (
    <section className="py-24 bg-white/40 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-brand-primary font-bold text-sm tracking-widest uppercase mb-2 block">{getUIText('landingFeaturesTag', language)}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-text">{getUIText('landingFeaturesTitle', language)}</h2>
          <p className="mt-4 text-brand-subtext">{getUIText('landingFeaturesSubtitle', language)}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-[#FFFDFB] p-8 rounded-3xl shadow-sm border border-orange-50 hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center mb-6 ${feature.color}`}>
                <feature.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

