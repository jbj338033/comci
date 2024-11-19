"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineExternalLink } from "react-icons/hi";
import { IoIosWarning } from "react-icons/io";
import { useState } from "react";
import { motion } from "framer-motion";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await signIn("google", { callbackUrl: "/" });
    } catch {
      setError("로그인 중 문제가 발생했습니다. 다시 시도해 주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const logoVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-blue-50 px-4">
      {/* 배경 디자인 요소 */}
      <motion.div
        className="pointer-events-none fixed inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute -left-4 top-0 h-64 w-64 rounded-full bg-blue-100/40 blur-3xl"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute right-0 top-0 h-64 w-64 rounded-full bg-indigo-100/40 blur-3xl"
          animate={{
            y: [0, 20, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* 메인 컨테이너 */}
      <motion.main
        className="z-10 w-full max-w-sm"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 로고와 타이틀 */}
        <div className="mb-8 text-center">
          <motion.div
            className="mx-auto mb-4 flex h-16 w-16 cursor-default items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-2xl font-bold text-white"
            variants={logoVariants}
            whileHover="hover"
          >
            CS
          </motion.div>
          <h1 className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-2xl font-bold text-transparent">
            컴시간학생
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            시간표와 학사일정을 한 눈에
          </p>
        </div>

        {/* 로그인 박스 */}
        <motion.div
          className="overflow-hidden rounded-2xl bg-white/80 shadow-lg backdrop-blur-lg"
          whileHover={{
            y: -2,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="p-8">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600"
              >
                {error}
              </motion.div>
            )}

            {/* 중요 안내사항 */}
            <div className="mb-6 rounded-lg bg-amber-50 p-4">
              <div className="flex items-center gap-2 text-amber-800">
                <IoIosWarning className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm font-medium">
                  학교 이메일(@school.edu)로만 로그인이 가능합니다
                </p>
              </div>
            </div>

            {/* 로그인 버튼 */}
            <motion.button
              onClick={handleSignIn}
              disabled={isLoading}
              className="relative flex w-full items-center justify-center gap-3 rounded-xl bg-white p-4 text-base font-medium text-gray-700 shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:bg-gray-50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-70"
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                animate={isLoading ? { rotate: 360 } : {}}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <FcGoogle className="h-6 w-6" />
              </motion.div>
              <span>
                {isLoading ? "로그인 중..." : "Google 계정으로 로그인"}
              </span>
            </motion.button>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                로그인 시{" "}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="inline-flex items-center gap-0.5 text-blue-600 hover:underline"
                >
                  이용약관
                  <HiOutlineExternalLink className="h-3 w-3" />
                </motion.button>
                과{" "}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="inline-flex items-center gap-0.5 text-blue-600 hover:underline"
                >
                  개인정보처리방침
                  <HiOutlineExternalLink className="h-3 w-3" />
                </motion.button>
                에 동의하게 됩니다
              </p>
            </div>
          </div>
        </motion.div>

        {/* 하단 링크 */}
        <div className="mt-8 flex justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            도움말
          </motion.button>
          <span className="text-gray-300">•</span>
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            문의하기
          </motion.button>
        </div>
      </motion.main>
    </div>
  );
}
