'use client';

import Label from '@/app/components/common/Label';

export default function LabelTestPage() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Label label={'최고'} size="small" variant="best" />
      <Label label={'좋음'} size="small" variant="good" />
      <Label label={'보통'} size="medium" variant="normal" />
      <Label label={'별로'} size="medium" variant="bad" />
      <Label label={'최악'} size="large" variant="worst" />
    </div>
  );
}
