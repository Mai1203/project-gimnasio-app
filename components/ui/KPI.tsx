'use client';

import { motion } from 'framer-motion';
import { Card } from './Card';
import { cn } from '@/lib/utils';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface KPIProps {
  title: string;
  value: number | string;
  icon: typeof LucideIcon;
  trend?: {
    change: number;
    isPositive: boolean;
  };
  prefix?: string;
  suffix?: string;
  animate?: boolean;
  className?: string;
}

/**
 * KPI Card component with animated counters
 * Used in the dashboard for displaying key metrics
 */
export function KPI({
  title,
  value,
  icon: Icon,
  trend,
  prefix = '',
  suffix = '',
  animate = true,
  className,
}: KPIProps) {
  const numericValue = typeof value === 'number' ? value : parseFloat(value.toString());
  const isNumeric = !isNaN(numericValue);

  return (
    <Card hover className={cn('relative overflow-hidden', className)}>
      {/* Background icon */}
      <div className="absolute top-4 right-4 opacity-10">
        <Icon className="h-12 w-12" />
      </div>

      <div className="relative">
        {/* Main icon */}
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-primary bg-opacity-20 rounded-lg">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          {trend && (
            <div className={cn(
              'flex items-center space-x-1 text-sm font-medium',
              trend.isPositive ? 'text-success' : 'text-error'
            )}>
              <span>{trend.isPositive ? '+' : '-'}{Math.abs(trend.change)}%</span>
            </div>
          )}
        </div>

        {/* Title */}
        <p className="text-text-secondary text-sm font-medium mb-2">
          {title}
        </p>

        {/* Value */}
        <div className="text-2xl font-bold text-text-primary">
          {prefix}
          {animate && isNumeric ? (
            <AnimatedCounter
              from={0}
              to={numericValue}
              duration={2000}
            />
          ) : (
            value
          )}
          {suffix}
        </div>
      </div>
    </Card>
  );
}

/**
 * Animated counter component
 * Animates from one number to another
 */
function AnimatedCounter({ 
  from, 
  to, 
  duration = 2000 
}: { 
  from: number; 
  to: number; 
  duration?: number; 
}) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.span
        initial={from}
        animate={to}
        transition={{ duration: duration / 1000, ease: 'easeOut' }}
        onUpdate={(latest) => {
          const element = document.querySelector(`[data-counter="${to}"]`);
          if (element) {
            element.textContent = Math.floor(latest as number).toLocaleString();
          }
        }}
      >
        <span data-counter={to}>
          {from.toLocaleString()}
        </span>
      </motion.span>
    </motion.span>
  );
}