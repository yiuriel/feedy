export const queryKeys = {
  auth: {
    verify: "authVerify",
  },
  user: {
    me: "userMe",
  },
  organization: {
    needsDetails: "organizationNeedsDetails",
  },
  dashboard: {
    stats: "dashboardStats",
  },
  analytics: {
    responsesOverTime: "analyticsResponsesOverTime",
    questionTypesDistribution: "analyticsQuestionTypesDistribution",
    ratingQuestionsAverage: "analyticsRatingQuestionsAverage",
  },
  form: {
    answers: "formAnswers",
    getAll: "formGetAll",
    password: "formPassword",
    checkPassword: "formCheckPassword",
  },
  feedbackResponse: {
    create: "feedbackResponseCreate",
    exportCsv: "feedbackResponseExportCsv",
  },
} as const;
