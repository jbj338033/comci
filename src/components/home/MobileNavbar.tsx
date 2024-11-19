"use client";

import { motion } from "framer-motion";
import { IoTimeOutline } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";
import { HiOutlineMenu } from "react-icons/hi";

export default function MobileNavbar() {
  return (
    <motion.nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/80 backdrop-blur-lg md:hidden"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto flex max-w-md justify-around p-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="rounded-lg p-2 text-indigo-600"
        >
          <IoTimeOutline className="h-6 w-6" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="rounded-lg p-2 text-gray-400"
        >
          <LuCalendarDays className="h-6 w-6" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="rounded-lg p-2 text-gray-400"
        >
          <HiOutlineMenu className="h-6 w-6" />
        </motion.button>
      </div>
    </motion.nav>
  );
}
