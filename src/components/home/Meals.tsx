"use client";

import { motion } from "framer-motion";

interface MealMenu {
  breakfast: string[];
  lunch: string[];
  dinner: string[];
}

interface MealsProps {
  menu: MealMenu;
}

export default function Meals({ menu }: MealsProps) {
  return (
    <motion.div
      className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="mb-4 text-lg font-semibold text-gray-900">오늘의 급식</h2>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-2 rounded-xl bg-gray-50 p-4">
          <div className="text-sm font-medium text-gray-600">아침</div>
          <div className="space-y-1 text-sm text-gray-800">
            {menu.breakfast.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        </div>
        <div className="space-y-2 rounded-xl bg-gray-50 p-4">
          <div className="text-sm font-medium text-gray-600">점심</div>
          <div className="space-y-1 text-sm text-gray-800">
            {menu.lunch.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        </div>
        <div className="space-y-2 rounded-xl bg-gray-50 p-4">
          <div className="text-sm font-medium text-gray-600">저녁</div>
          <div className="space-y-1 text-sm text-gray-800">
            {menu.dinner.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
