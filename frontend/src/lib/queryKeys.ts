export const queryKeys = {
  auth: {
    verify: ["auth", "verify"] as const,
  },
  user: {
    me: ["user", "me"] as const,
  },
  organization: {
    needsDetails: ["organization", "needsDetails"] as const,
  },
  dashboard: {
    stats: ["dashboard", "stats"] as const,
  },
} as const;
