'use client';

import AuthGuard from '@/app/components/AuthGuard';
import SettingsPanel from './components/SettingsPanel';

export default function SettingsPage() {
  return (
    <AuthGuard>
      <SettingsPanel />
    </AuthGuard>
  );
}
