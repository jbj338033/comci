"use client";

import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { IoLogOutOutline, IoTimeOutline } from "react-icons/io5";
import { HiOutlineBell } from "react-icons/hi";
import toast from "react-hot-toast";
import type { Session } from "next-auth";

interface NavbarProps {
  session: Session | null;
  currentClass: {
    period: number;
    timeLeft: number;
    progress: number;
  } | null;
  scheduleData: Record<
    number,
    { subject: string; teacher: string; room: string }
  >;
}

export default function Navbar({
  session,
  currentClass,
  scheduleData,
}: NavbarProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  // 실시간 시계 업데이트
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 알림 표시 함수
  const showNotification = () => {
    if (currentClass && scheduleData[currentClass.period]) {
      const currentSubject = scheduleData[currentClass.period];
      toast.custom(
        (t) => (
          <AnimatePresence>
            {t.visible && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="rounded-lg bg-white p-4 shadow-lg ring-1 ring-black/5"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      현재 수업 정보
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {currentSubject.subject} - {currentSubject.teacher} 선생님
                      <br />
                      {currentClass.timeLeft}분 남음 ({currentSubject.room})
                    </p>
                  </div>
                  <div className="ml-4">
                    <div className="h-2 w-20 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full bg-indigo-500 transition-all"
                        style={{ width: `${currentClass.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        ),
        {
          duration: 4000,
          position: "top-right",
        }
      );
    } else {
      toast.custom(
        (t) => (
          <AnimatePresence>
            {t.visible && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="rounded-lg bg-white p-4 shadow-lg ring-1 ring-black/5"
              >
                <p className="text-gray-600">현재 진행 중인 수업이 없습니다</p>
              </motion.div>
            )}
          </AnimatePresence>
        ),
        {
          duration: 3000,
          position: "top-right",
        }
      );
    }
  };

  return (
    <motion.nav
      className="fixed left-0 right-0 top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* 로고 */}
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 text-sm font-bold text-white shadow-lg shadow-indigo-200">
            CS
          </div>
          <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text font-semibold text-transparent">
            컴시간학생
          </span>
        </motion.div>

        {/* 현재 시간 */}
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-indigo-50 px-3 py-1">
          <IoTimeOutline className="text-indigo-600" />
          <span className="text-sm font-medium text-indigo-600">
            {currentTime.toLocaleTimeString("ko-KR", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </span>
        </div>

        {/* 프로필 영역 */}
        <div className="flex items-center gap-4">
          {/* 알림 버튼 */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100"
            onClick={showNotification}
          >
            <HiOutlineBell className="h-5 w-5" />
            {currentClass && (
              <span className="absolute right-1 top-1 h-2 w-2 animate-pulse rounded-full bg-red-500" />
            )}
          </motion.button>

          {/* 프로필 드롭다운 */}
          <motion.div
            className="flex items-center gap-3 rounded-full bg-white px-3 py-1.5 shadow-sm"
            whileHover={{ scale: 1.02 }}
          >
            {session?.user?.image && (
              <Image
                src={session.user.image}
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full ring-2 ring-indigo-100"
              />
            )}
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">
                {session?.user?.name}
              </span>
              <span className="text-xs text-gray-500">
                서울고등학교 2학년 3반
              </span>
            </div>
            <motion.button
              onClick={() => signOut()}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="ml-2 rounded-full p-1 text-gray-500 hover:bg-gray-100"
            >
              <IoLogOutOutline className="h-5 w-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}
