import { ReactNode } from 'react';

export interface BentoItemProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export interface StatProps {
  label: string;
  value: string;
  trend?: string;
}

export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}
