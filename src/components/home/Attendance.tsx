"use client";

import { motion } from "framer-motion";

interface AttendanceRecord {
  present: number;
  late: number;
  absent: number;
  earlyLeave: number;
}

interface AttendanceProps {
  record: AttendanceRecord;
}

export default function Attendance({ record }: AttendanceProps) {
  return (
    <motion.div
      className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100"
      whileHover={{ scale: 1.01 }}
    >
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        이번 달 출결 현황
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-green-50 p-4">
          <div className="text-sm text-green-600">출석</div>
          <div className="text-2xl font-bold text-green-700">
            {record.present}일
          </div>
        </div>
        <div className="rounded-lg bg-yellow-50 p-4">
          <div className="text-sm text-yellow-600">지각</div>
          <div className="text-2xl font-bold text-yellow-700">
            {record.late}일
          </div>
        </div>
        <div className="rounded-lg bg-red-50 p-4">
          <div className="text-sm text-red-600">결석</div>
          <div className="text-2xl font-bold text-red-700">
            {record.absent}일
          </div>
        </div>
        <div className="rounded-lg bg-blue-50 p-4">
          <div className="text-sm text-blue-600">조퇴</div>
          <div className="text-2xl font-bold text-blue-700">
            {record.earlyLeave}일
          </div>
        </div>
      </div>
    </motion.div>
  );
}
