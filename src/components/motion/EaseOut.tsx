'use client';

import { domAnimation, LazyMotion, motion } from 'framer-motion';
import type { ReactNode } from 'react';

export default function EaseOut({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <LazyMotion features={domAnimation}>
      <motion.div
        className={className}
        initial={{ opacity: 0, scale: 0.99 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.4,
          delay: delay,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        {children}
      </motion.div>
    </LazyMotion>
  );
}
