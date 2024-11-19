export interface ScheduleSubject {
  subject: string;
  teacher: string;
  room: string;
}

export interface Event {
  date: string;
  title: string;
  type: "event" | "exam" | "trip";
  description: string;
}

export interface MealMenu {
  breakfast: string[];
  lunch: string[];
  dinner: string[];
}

export interface AttendanceRecord {
  present: number;
  late: number;
  absent: number;
  earlyLeave: number;
}
