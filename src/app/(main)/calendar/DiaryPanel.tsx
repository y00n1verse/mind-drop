'use client';

import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { EllipsisVertical } from 'lucide-react';
import { emotions } from '@/constants/emotions';
import Button from '@/app/components/common/Button';
import { useDiaryStore } from '@/stores/useDiaryStore';
import { Dropdown } from '@/app/components/common/Dropdown/Dropdown';
import { DropdownTrigger } from '@/app/components/common/Dropdown/DropdownTrigger';
import { DropdownList } from '@/app/components/common/Dropdown/DropdownList';
import { DropdownItem } from '@/app/components/common/Dropdown/DropdownItem';
import useModal from '@/app/hooks/useModal';
import DeleteDiaryModal from '@/app/components/diary/DeleteDiaryModal';

export default function DiaryPanel() {
  const { t } = useTranslation();
  const { selectedDate, getDiaryByDate } = useDiaryStore();
  const router = useRouter();
  const { isOpen, openModal, closeModal } = useModal();

  const diary = selectedDate ? getDiaryByDate(selectedDate) : null;

  if (!diary) {
    return (
      <div className="mx-5 flex w-full flex-col items-center justify-center gap-6 rounded-md bg-[oklch(0.937_0_0)] p-4 md:mx-auto md:w-[700px] lg:m-0 lg:w-full lg:gap-8">
        <p className="text-center whitespace-pre-line">
          {t('diaryPanel.emptyMessage')}
        </p>
        <Button
          variant="complete"
          className="h-10 w-35 lg:w-45"
          onClick={() => {
            if (!selectedDate) return;
            router.push(`/diary?date=${selectedDate}`);
          }}
        >
          {t('diaryPanel.writeButton')}
        </Button>
      </div>
    );
  }

  const emotionData = emotions.find((e) => e.variant === diary.emotion);
  const { date, title, content } = diary;
  const dateObj = new Date(date);
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();

  return (
    <>
      <DeleteDiaryModal isOpen={isOpen} onClose={closeModal} />

      <div className="relative mx-5 flex w-full items-center gap-4 rounded-md bg-[oklch(0.937_0_0)] p-5 transition-all md:mx-auto md:w-[700px] md:p-5 lg:m-0 lg:w-full lg:flex-col lg:items-start lg:gap-5 lg:p-10">
        <div
          className="absolute top-4 right-4 z-10 md:top-6 md:right-6"
          onClick={(e) => e.stopPropagation()}
        >
          <Dropdown>
            <DropdownTrigger className="cursor-pointer rounded-lg p-2 hover:bg-gray-100">
              <EllipsisVertical className="h-5 w-5 text-gray-500 lg:h-6 lg:w-6" />
            </DropdownTrigger>
            <DropdownList className="right-0">
              <DropdownItem
                onSelect={() => router.push(`/diary?date=${selectedDate}`)}
              >
                {t('diaryPanel.view')}
              </DropdownItem>
              <DropdownItem
                onSelect={() =>
                  router.push(`/diary?date=${selectedDate}&edit=true`)
                }
              >
                {t('diaryPanel.edit')}
              </DropdownItem>
              <DropdownItem
                onSelect={openModal}
                className="text-[var(--color-warn-bg)]"
              >
                {t('diaryPanel.delete')}
              </DropdownItem>
            </DropdownList>
          </Dropdown>
        </div>

        {emotionData && (
          <div className="md:self-center">
            {emotionData?.Icon && (
              <emotionData.Icon
                className={`h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 ${emotionData.color}`}
              />
            )}
          </div>
        )}

        <p className="hidden w-full text-center text-base text-gray-600 md:text-lg lg:block">
          {t('diaryPanel.title', { month, day })}
        </p>

        <div className="flex w-full flex-col gap-2 md:gap-3 lg:gap-5">
          <div className="flex items-center justify-between">
            <h1 className="w-32 truncate text-lg font-semibold md:w-full md:text-xl lg:mt-8 lg:text-2xl">
              {title}
            </h1>
            <p className="text-md hidden text-gray-500 lg:hidden">{date}</p>
          </div>

          <div className="lg:flex lg:flex-col lg:items-start">
            <p className="block w-36 truncate text-sm md:text-base lg:line-clamp-6 lg:w-full lg:overflow-hidden lg:whitespace-normal">
              {content}
            </p>
            <p className="text-right text-sm text-gray-400 lg:hidden">{date}</p>
          </div>
        </div>
      </div>
    </>
  );
}
