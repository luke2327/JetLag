'use client';

import { domAnimation, LazyMotion, motion } from 'framer-motion';
import type { ReactNode } from 'react';

export default function EaseOut({
  children,
  delay,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <LazyMotion features={domAnimation}>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: delay,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        {children}
      </motion.div>
    </LazyMotion>
  );
}
