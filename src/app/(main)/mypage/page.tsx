import AuthGuard from '@/app/components/AuthGuard';
import SettingsPanel from '@/app/components/settings/SettingsPanel';

export default function MyPage() {
  return (
    <div>
      <AuthGuard>
        <SettingsPanel />
      </AuthGuard>
    </div>
  );
}
