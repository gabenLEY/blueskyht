// components/SessionWrapper.tsx
"use client"; // Ensure this component is treated as a Client Component

import { SessionProvider } from "next-auth/react";

export default function SessionWrapper({
  children
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}