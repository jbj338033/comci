"use client";

import type { ScheduleSubject } from "@/types/schedule";
import { motion } from "framer-motion";

interface CurrentClassProps {
  period: number | null;
  timeLeft: number | null;
  progress: number | null;
  scheduleData: Record<number, ScheduleSubject>;
}

export default function CurrentClass({
  period,
  timeLeft,
  progress,
  scheduleData,
}: CurrentClassProps) {
  const isCurrentPeriod =
    period !== null && timeLeft !== null && progress !== null;

  return (
    <motion.div
      className="rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 p-6 text-white shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-lg font-semibold">현재 수업</h2>

      {isCurrentPeriod ? (
        <div className="relative">
          {/* 프로그레스 바 */}
          <div className="absolute -bottom-6 -left-6 -right-6 h-1 overflow-hidden bg-indigo-400/20">
            <motion.div
              className="h-full bg-white"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <div className="mt-4 text-2xl font-bold">
            {scheduleData[period].subject}
          </div>
          <div className="mt-2 text-indigo-100">
            {scheduleData[period].teacher} 선생님
          </div>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-sm text-indigo-100">
              {scheduleData[period].room}
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-sm">
              {timeLeft}분 남음
            </span>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <div className="text-lg">현재 수업 시간이 아닙니다</div>
          <p className="mt-2 text-sm text-indigo-100">
            다음 수업 시간을 기다려주세요
          </p>
        </div>
      )}
    </motion.div>
  );
}
