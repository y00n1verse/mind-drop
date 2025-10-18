'use client';

import Button from '@/app/components/common/Button';

export default function ButtonTestPage() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <Button size="small" variant="complete">
          Small
        </Button>
        <Button size="medium" variant="complete">
          Medium
        </Button>
        <Button size="large" variant="complete">
          Large
        </Button>
      </div>
      <div className="flex gap-2">
        <Button size="large" variant="cancel">
          취소
        </Button>
        <Button size="large" variant="warn">
          경고
        </Button>
        <Button size="large" variant="complete">
          확인
        </Button>
      </div>
    </div>
  );
}
