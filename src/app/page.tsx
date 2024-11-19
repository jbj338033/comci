"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Navbar from "@/components/home/Navbar";
import TimeTable from "@/components/home/TimeTable";
import CurrentClass from "@/components/home/CurrentClass";
import Schedule from "@/components/home/Schedule";
import Attendance from "@/components/home/Attendance";
import Meals from "@/components/home/Meals";
import MobileNavbar from "@/components/home/MobileNavbar";
import type { Event, ScheduleSubject } from "@/types/schedule";

// 교시별 시간 정보
const PERIODS = {
  1: { start: "09:00", end: "09:50" },
  2: { start: "10:00", end: "10:50" },
  3: { start: "11:00", end: "11:50" },
  4: { start: "12:00", end: "12:50" },
  5: { start: "14:00", end: "14:50" },
  6: { start: "15:00", end: "15:50" },
  7: { start: "16:00", end: "16:50" },
} as const;

// 요일별, 교시별 수업 정보
const SCHEDULE: Record<number, Record<string, ScheduleSubject>> = {
  1: {
    // 월요일
    "1": { subject: "국어", teacher: "김태희", room: "1-1" },
    "2": { subject: "영어", teacher: "이민정", room: "어학실" },
    "3": { subject: "수학", teacher: "손예진", room: "1-1" },
    "4": { subject: "과학", teacher: "전지현", room: "과학실" },
    "5": { subject: "사회", teacher: "김수현", room: "1-1" },
    "6": { subject: "체육", teacher: "조인성", room: "체육관" },
    "7": { subject: "음악", teacher: "정해인", room: "음악실" },
  },
  2: {
    // 화요일
    "1": { subject: "수학", teacher: "손예진", room: "1-1" },
    "2": { subject: "국어", teacher: "김태희", room: "1-1" },
    "3": { subject: "영어", teacher: "이민정", room: "어학실" },
    "4": { subject: "체육", teacher: "조인성", room: "체육관" },
    "5": { subject: "과학", teacher: "전지현", room: "과학실" },
    "6": { subject: "사회", teacher: "김수현", room: "1-1" },
    "7": { subject: "음악", teacher: "정해인", room: "음악실" },
  },
  3: {
    // 수요일
    "1": { subject: "영어", teacher: "이민정", room: "어학실" },
    "2": { subject: "수학", teacher: "손예진", room: "1-1" },
    "3": { subject: "국어", teacher: "김태희", room: "1-1" },
    "4": { subject: "음악", teacher: "정해인", room: "음악실" },
    "5": { subject: "체육", teacher: "조인성", room: "체육관" },
    "6": { subject: "과학", teacher: "전지현", room: "과학실" },
    "7": { subject: "사회", teacher: "김수현", room: "1-1" },
  },
  4: {
    // 목요일
    "1": { subject: "사회", teacher: "김수현", room: "1-1" },
    "2": { subject: "과학", teacher: "전지현", room: "과학실" },
    "3": { subject: "체육", teacher: "조인성", room: "체육관" },
    "4": { subject: "국어", teacher: "김태희", room: "1-1" },
    "5": { subject: "영어", teacher: "이민정", room: "어학실" },
    "6": { subject: "수학", teacher: "손예진", room: "1-1" },
    "7": { subject: "음악", teacher: "정해인", room: "음악실" },
  },
  5: {
    // 금요일
    "1": { subject: "음악", teacher: "정해인", room: "음악실" },
    "2": { subject: "사회", teacher: "김수현", room: "1-1" },
    "3": { subject: "수학", teacher: "손예진", room: "1-1" },
    "4": { subject: "영어", teacher: "이민정", room: "어학실" },
    "5": { subject: "국어", teacher: "김태희", room: "1-1" },
    "6": { subject: "과학", teacher: "전지현", room: "과학실" },
    "7": { subject: "체육", teacher: "조인성", room: "체육관" },
  },
};

const WEEKDAYS = ["월", "화", "수", "목", "금"] as const;

const EVENTS: Event[] = [
  {
    date: "2024-03-20",
    title: "학부모 상담의 날",
    type: "event" as const,
    description: "13:00 ~ 17:00",
  },
  {
    date: "2024-03-25",
    title: "중간고사 시작",
    type: "exam" as const,
    description: "~ 3월 29일까지",
  },
  {
    date: "2024-04-01",
    title: "봄 소풍",
    type: "trip" as const,
    description: "에버랜드",
  },
];

const MEALS_MENU = {
  breakfast: ["찹쌀밥", "된장찌개", "제육볶음", "김치", "요구르트"],
  lunch: ["흑미밥", "미역국", "닭갈비", "무생채", "깍두기", "사과"],
  dinner: [
    "잡곡밥",
    "소고기무국",
    "고등어구이",
    "청경채무침",
    "총각김치",
    "바나나",
  ],
};

const ATTENDANCE_RECORD = {
  present: 18,
  late: 1,
  absent: 0,
  earlyLeave: 0,
};

// 현재 시간 기준으로 진행 중인 교시 계산
const getCurrentPeriod = () => {
  const now = new Date();
  const minutes = now.getHours() * 60 + now.getMinutes();

  for (const [period, time] of Object.entries(PERIODS)) {
    const [startHour, startMinute] = time.start.split(":").map(Number);
    const [endHour, endMinute] = time.end.split(":").map(Number);
    const start = startHour * 60 + startMinute;
    const end = endHour * 60 + endMinute;

    if (minutes >= start && minutes <= end) {
      return {
        period: Number(period),
        timeLeft: end - minutes,
        progress: ((minutes - start) / (end - start)) * 100,
      };
    }
  }
  return null;
};

export default function MainPage() {
  const { data: session } = useSession();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentClass, setCurrentClass] = useState(getCurrentPeriod());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setCurrentClass(getCurrentPeriod());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50/30">
      <Navbar
        session={session}
        currentClass={currentClass}
        scheduleData={SCHEDULE[currentTime.getDay()]}
      />

      <main className="mx-auto max-w-7xl px-4 pt-24">
        <div className="grid gap-6 md:grid-cols-3">
          <TimeTable
            periods={PERIODS}
            schedule={SCHEDULE}
            weekdays={WEEKDAYS}
            currentTime={currentTime}
            currentClass={currentClass}
          />

          <div className="space-y-4">
            <CurrentClass
              period={currentClass?.period ?? null}
              timeLeft={currentClass?.timeLeft ?? null}
              progress={currentClass?.progress ?? null}
              scheduleData={SCHEDULE[currentTime.getDay()]}
            />
            <Schedule events={EVENTS} />
            <Attendance record={ATTENDANCE_RECORD} />
          </div>
        </div>

        <div className="mt-6">
          <Meals menu={MEALS_MENU} />
        </div>
      </main>

      <MobileNavbar />
    </div>
  );
}
