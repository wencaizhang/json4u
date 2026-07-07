import { type Statistics, type StatisticsKeys } from "@/lib/env";
import type { SubscriptionType } from "@/lib/shop/types";
import { type FunctionKeys } from "@/lib/utils";
import { create } from "zustand";

export const initialStatistics: Statistics = {
  graphModeView: 0,
  tableModeView: 0,
  textComparison: 0,
  jqExecutions: 0,
};

export interface UserState {
  statistics: Statistics;

  usable: (key: StatisticsKeys) => boolean;
  count: (key: StatisticsKeys) => void;
  isPremium: () => boolean;
  getPlan: () => SubscriptionType;
  setStatistics: (statistics: Statistics) => void;
}

const initialStates: Omit<UserState, FunctionKeys<UserState>> = {
  statistics: initialStatistics,
};

export const useUserStore = create<UserState>()((set, get) => ({
  ...initialStates,

  usable(_key: StatisticsKeys) {
    return true;
  },

  count(key: StatisticsKeys) {
    const { statistics } = get();
    statistics[key] += 1;
    set({ statistics });
  },

  isPremium() {
    return false;
  },

  getPlan(): SubscriptionType {
    return "free";
  },

  setStatistics(statistics: Statistics) {
    set({ statistics });
  },
}));

export function getUserState() {
  return useUserStore.getState();
}
