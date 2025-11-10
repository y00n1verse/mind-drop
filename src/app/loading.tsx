'use client';

import { BeatLoader, FadeLoader } from 'react-spinners';

type SpinnerVariant = 'beat' | 'fade';

type SpinnerProps = {
  loading?: boolean;
  variant?: SpinnerVariant;
};

export default function Spinner({
  loading = true,
  variant = 'beat',
}: SpinnerProps) {
  if (!loading) return null;

  if (variant === 'beat') {
    return (
      <div className="flex items-center justify-center">
        <BeatLoader color="#88b789" size={8} margin={4} />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[99] flex items-center justify-center bg-black/50">
      <FadeLoader
        color="#88b789"
        height={16}
        width={5}
        radius={3}
        margin={5}
        loading={loading}
      />
    </div>
  );
}
