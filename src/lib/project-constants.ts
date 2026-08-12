export const PROJECT_CATEGORIES = [
  "Hackathon",
  "Research",
  "Client Work",
  "Personal/OSS",
  "Academic",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export const PROJECT_STATUSES = [
  "In Progress",
  "Completed",
  "Maintained",
  "Archived",
] as const;

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];
