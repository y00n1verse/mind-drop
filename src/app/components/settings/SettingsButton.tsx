'use client';

import { cloneElement, isValidElement, ReactElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SettingsButtonProps {
  icon?: ReactElement<{ className?: string }>;
  label: string;
  onClick?: () => void;
  color?: string;
  animatedLabel?: boolean;
  animationKey?: string;
}

export default function SettingsButton({
  icon,
  label,
  onClick,
  color = 'text-gray-600',
  animatedLabel = false,
  animationKey,
}: SettingsButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full cursor-pointer rounded-sm px-5 py-3 text-left text-base font-medium transition hover:bg-gray-100 md:w-auto md:rounded-xl md:border md:border-gray-100 md:p-12 md:text-center md:shadow-md md:hover:bg-gray-100 lg:p-18"
    >
      <div className="flex items-center justify-start gap-2 md:flex-col md:justify-center">
        {isValidElement(icon) && (
          <div
            className={`hidden md:block md:h-16 md:w-16 lg:h-20 lg:w-20 ${color}`}
          >
            {cloneElement(icon, {
              className:
                'h-20 w-20 md:h-16 md:w-16 lg:h-20 lg:w-24 shrink-0 flex-none',
            })}
          </div>
        )}

        {animatedLabel ? (
          <AnimatePresence mode="wait">
            <motion.span
              key={animationKey}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={`block md:mt-2 md:text-lg md:font-semibold ${color}`}
            >
              {label}
            </motion.span>
          </AnimatePresence>
        ) : (
          <span
            className={`block md:mt-2 md:text-lg md:font-semibold ${color}`}
          >
            {label}
          </span>
        )}
      </div>
    </button>
  );
}
