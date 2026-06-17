import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Evently",
  description: "Evently is a platform for event management",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="">{children}</div>;
}
