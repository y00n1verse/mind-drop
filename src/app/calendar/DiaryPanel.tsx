import Button from '../components/common/Button';

export default function DiaryPanel() {
  return (
    <div className="m-5 flex h-40 flex-col items-center justify-center gap-8 rounded-md bg-[oklch(0.937_0_0)] p-4 md:m-0 md:h-150 md:w-full md:p-5 lg:p-8">
      <div className="text-center">
        <p>아직 작성된 일기가 없어요</p>
        <p>일기를 작성하러 갈까요?</p>
      </div>

      <Button variant="complete" size="large">
        일기쓰러 가기
      </Button>
    </div>
  );
}
