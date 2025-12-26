import { LucideIcon } from 'lucide-react';

export interface FeatureItem {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export interface StepItem {
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
}

