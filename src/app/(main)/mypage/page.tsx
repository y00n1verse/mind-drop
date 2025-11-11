import AuthGuard from '@/app/components/AuthGuard';
import SettingsPanel from '@/app/components/settings/SettingsPanel';

export default function MyPage() {
  return (
    <div className="md:mt-18">
      <AuthGuard>
        <SettingsPanel />
      </AuthGuard>
    </div>
  );
}
