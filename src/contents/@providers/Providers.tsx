"use client";

import { type PropsWithChildren } from "react";

import { ReactQueryProvider } from "@Application/lib/react-query";

export function Providers({ children }: PropsWithChildren) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
