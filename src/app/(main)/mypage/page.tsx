import AuthGuard from '@/app/components/AuthGuard';
import SettingsPanel from './components/SettingsPanel';

export default function MyPage() {
  return (
    <div>
      <AuthGuard>
        <SettingsPanel />
      </AuthGuard>
    </div>
  );
}
