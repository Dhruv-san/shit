"use client";

import { NhostClient, NhostProvider } from "@nhost/nextjs";
import { ReactNode } from "react";

const nhost = new NhostClient({
  subdomain: "whichjdhikwjcjpnrsgpoooom",
  region: "ap-south-1",
});

export const NhostClientProvider = ({ children }: { children: ReactNode }) => {
  return <NhostProvider nhost={nhost}>{children}</NhostProvider>;
};