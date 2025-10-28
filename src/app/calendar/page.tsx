import Calendar from './Calendar';
import DiaryPanel from './DiaryPanel';

export default function CalendarPage() {
  return (
    <div className="flex flex-col md:mx-10 md:mt-25 md:flex-row md:gap-5 lg:mx-15 lg:mt-30 lg:gap-5">
      <Calendar />
      <DiaryPanel />
    </div>
  );
}
