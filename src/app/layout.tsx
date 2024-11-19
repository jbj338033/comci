import "./globals.css";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import AuthSessionProvider from "@/components/providers/AuthSessionProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="ko">
      <body className={inter.className}>
        <AuthSessionProvider session={session}>
          {children}
          <Toaster />
        </AuthSessionProvider>
      </body>
    </html>
  );
}
