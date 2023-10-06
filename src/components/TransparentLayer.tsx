import type React from 'react';

export default function TransparentLayer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <fieldset className={`transparent-layer mt-4 p-4 ${className}`}>
      {children}
    </fieldset>
  );
}
