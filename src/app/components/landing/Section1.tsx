import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { emotions } from '@/constants/emotions';

export default function Section1() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleClick = () => {
    if (session) {
      router.push('/diary/form');
    } else {
      router.push('/signin');
    }
  };

  return (
    <div className="section flex h-screen flex-col items-center justify-center bg-[var(--background-tertiary)] pb-5 text-center md:pb-30">
      <div className="flex flex-col items-center justify-center gap-8 md:gap-10 lg:gap-12">
        <div className="flex gap-4 md:gap-6">
          {emotions.map((emotion, i) => {
            const Icon = emotion.Icon;
            return (
              <div
                key={emotion.label}
                className={`flex flex-col items-center ${emotion.color} animate-wave`}
                style={{
                  animationDelay: `${i * 0.2}s`,
                }}
              >
                <Icon className="h-14 w-14 md:h-20 md:w-20 lg:h-25 lg:w-25" />
              </div>
            );
          })}
        </div>

        <div className="relative flex flex-col items-center gap-2">
          <h1 className="typing-title mb-2 text-3xl font-bold md:text-4xl">
            Mind Drop
          </h1>
          <p className="text-lg text-[color:var(--text-secondary)] md:text-xl">
            하루를 기록하고 돌아보는 여정의 시작
          </p>
        </div>
        <button
          onClick={handleClick}
          className="cursor-pointer rounded-full bg-[var(--color-brand-primary)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--color-brand-primary-hover)] md:px-8 md:py-3 lg:px-10"
        >
          {session ? '일기 쓰러가기' : '지금 시작하기'}
        </button>
      </div>
    </div>
  );
}
