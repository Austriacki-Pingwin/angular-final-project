import type { CvContent } from '../models/cv-content.model';

const WEIGHTS = {
  summary: 25,
  experience: 25,
  education: 25,
  skills: 25,
} as const;

export function calculateCvProgress(content: CvContent): number {
  let progress = 0;

  // summary
  if (content.summary.trim().length > 0) {
    progress += WEIGHTS.summary;
  }

  // experience (array of objects)
  const hasValidExperience = content.experience.some((exp) =>
    Boolean(exp.position && exp.company && exp.startDate && exp.description),
  );

  if (hasValidExperience) {
    progress += WEIGHTS.experience;
  }

  // education (array of objects)
  const hasValidEducation = content.education.some((edu) =>
    Boolean(edu.degree && edu.institution && edu.startDate),
  );

  if (hasValidEducation) {
    progress += WEIGHTS.education;
  }

  // skills (array of strings)
  if (content.skills.length > 0) {
    progress += WEIGHTS.skills;
  }

  return progress;
}
