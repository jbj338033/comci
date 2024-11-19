"use client";

import type { ScheduleSubject } from "@/types/schedule";

interface TimeTableProps {
  periods: Record<number, { start: string; end: string }>;
  schedule: Record<number, Record<string, ScheduleSubject>>;
  weekdays: readonly ["월", "화", "수", "목", "금"];
  currentTime: Date;
  currentClass: {
    period: number;
    timeLeft: number;
    progress: number;
  } | null;
}

export default function TimeTable({
  periods,
  schedule,
  weekdays,
  currentTime,
  currentClass,
}: TimeTableProps) {
  const currentDay = currentTime.getDay();

  return (
    <div className="col-span-2 overflow-hidden rounded-2xl bg-white shadow-lg">
      <div className="border-b border-gray-100 bg-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">학급 시간표</h2>
            <p className="mt-1 text-sm text-gray-500">
              {currentTime.toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "long",
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                교시
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                시간
              </th>
              {weekdays.map((day, index) => (
                <th
                  key={day}
                  className={`px-4 py-3 text-center text-xs font-medium tracking-wider ${
                    currentDay === index + 1
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-500"
                  }`}
                >
                  {day}요일
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Object.entries(periods).map(([period, time]) => {
              const isCurrentPeriod = currentClass?.period === Number(period);

              return (
                <tr
                  key={period}
                  className={isCurrentPeriod ? "bg-blue-50" : ""}
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {period}교시
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center">
                    <div className="text-sm text-gray-500">
                      {time.start} ~ {time.end}
                    </div>
                  </td>
                  {weekdays.map((_, dayIndex) => {
                    const dayNumber = dayIndex + 1;
                    const subject = schedule[dayNumber][period];
                    const isCurrentClass =
                      isCurrentPeriod && currentDay === dayNumber;

                    return (
                      <td
                        key={dayNumber}
                        className={`px-4 py-3 relative ${
                          isCurrentClass ? "bg-blue-100" : ""
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-900">
                            {subject.subject}
                          </span>
                          <span className="text-xs text-gray-500">
                            {subject.teacher} · {subject.room}
                          </span>
                        </div>
                        {isCurrentClass && (
                          <>
                            <div className="mt-1 flex items-center gap-2">
                              <div className="text-xs text-blue-600">
                                {currentClass.timeLeft}분 남음
                              </div>
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                진행중
                              </span>
                            </div>
                            {/* 진행 상태 바 */}
                            <div className="absolute bottom-0 left-0 h-0.5 bg-blue-200 w-full overflow-hidden">
                              <div
                                className="h-full bg-blue-600 transition-all duration-1000"
                                style={{ width: `${currentClass.progress}%` }}
                              />
                            </div>
                          </>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
