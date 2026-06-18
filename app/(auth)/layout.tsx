import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Evently-auth",
  description: "Evently is a platform for event management",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="flex-center min-h-screen">{children}</div>;
}
