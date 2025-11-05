'use client';

export default function ChangePasswordButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full cursor-pointer rounded-sm px-5 py-3 text-left text-base font-medium transition hover:bg-gray-100"
    >
      비밀번호 변경
    </button>
  );
}
