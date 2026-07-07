"use client";

import { type Config, defaultConfig } from "@/lib/db/config";

export function useConfigFromCookies(): Config {
  return defaultConfig;
}
