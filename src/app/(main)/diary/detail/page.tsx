import { Suspense } from 'react';
import DiaryDetail from './DiaryDetail';

export default function DiaryDetailPage() {
  return (
    <Suspense fallback={<div>로딩 중</div>}>
      <DiaryDetail />
    </Suspense>
  );
}
