'use client';

import Button from '@/app/components/common/Button';

export default function ChangePasswordButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <Button variant="warn" onClick={onClick} className="cursor-pointer">
      비밀번호 변경
    </Button>
  );
}
