// components/home/Schedule.tsx
"use client";

import { motion } from "framer-motion";
import { LuCalendarDays } from "react-icons/lu";
import { BsPencilFill } from "react-icons/bs";
import { IoSchoolOutline } from "react-icons/io5";

interface Event {
  date: string;
  title: string;
  type: "event" | "exam" | "trip";
  description: string;
}

interface ScheduleProps {
  events: Event[];
}

export default function Schedule({ events }: ScheduleProps) {
  const getEventIcon = (type: Event["type"]) => {
    switch (type) {
      case "exam":
        return <BsPencilFill className="text-red-500" />;
      case "trip":
        return <IoSchoolOutline className="text-green-500" />;
      default:
        return <LuCalendarDays className="text-blue-500" />;
    }
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">학사일정</h2>
        <LuCalendarDays className="h-5 w-5 text-gray-500" />
      </div>
      <div className="space-y-3">
        {events.map((event) => (
          <motion.div
            key={event.date}
            className="flex items-center gap-3 rounded-xl border border-gray-100 p-3 transition-all hover:bg-gray-50"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-50">
              {getEventIcon(event.type)}
            </div>
            <div>
              <div className="font-medium text-gray-900">{event.title}</div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>
                  {new Date(event.date).toLocaleDateString("ko-KR", {
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span>•</span>
                <span>{event.description}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
