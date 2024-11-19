// components/ui/Notification.tsx
"use client";

import { motion } from "framer-motion";

interface NotificationProps {
  currentClass?: {
    subject: string;
    period: number;
    timeLeft: number;
  } | null;
}

export default function Notification({ currentClass }: NotificationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="absolute right-0 top-full mt-2 w-80 rounded-xl bg-white p-4 shadow-xl"
    >
      <h3 className="mb-2 font-semibold text-gray-900">알림</h3>
      <div className="space-y-2">
        {currentClass ? (
          <div className="rounded-lg bg-gray-50 p-2 text-sm">
            <p className="font-medium text-gray-900">현재 수업 정보</p>
            <p className="text-gray-600">
              {currentClass.period}교시 {currentClass.subject} 수업이{" "}
              {currentClass.timeLeft}분 남았습니다.
            </p>
          </div>
        ) : (
          <div className="rounded-lg bg-gray-50 p-2 text-sm">
            <p className="font-medium text-gray-900">쉬는 시간</p>
            <p className="text-gray-600">현재는 수업 시간이 아닙니다.</p>
          </div>
        )}
        <div className="rounded-lg bg-blue-50 p-2 text-sm">
          <p className="font-medium text-blue-900">오늘의 일정</p>
          <p className="text-blue-600">3교시 후 급식 시간입니다.</p>
        </div>
      </div>
    </motion.div>
  );
}
