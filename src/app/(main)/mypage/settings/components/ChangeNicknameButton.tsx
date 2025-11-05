'use client';

export default function ChangeNicknameButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full cursor-pointer rounded-sm px-5 py-3 text-left text-base font-medium transition hover:bg-gray-100"
    >
      닉네임 변경
    </button>
  );
}
