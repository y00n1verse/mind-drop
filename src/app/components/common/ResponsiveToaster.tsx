'use client';

import { Toaster } from 'sonner';
import useIsMobile from '@/stores/useIsMobile';

export default function ResponsiveToaster() {
  const isMobile = useIsMobile();
  return (
    <Toaster richColors position={isMobile ? 'bottom-center' : 'top-center'} />
  );
}
