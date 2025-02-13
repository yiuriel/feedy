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
  form: {
    answers: ["form", "answers"] as const,
    list: ["form", "list"] as const,
    one: ["form", "one"] as const,
  },
  feedbackResponse: {
    create: ["feedbackResponse", "create"] as const,
  },
} as const;
