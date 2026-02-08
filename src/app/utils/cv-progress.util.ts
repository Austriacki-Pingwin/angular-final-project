import type { FullCV } from '../models/cv.model';

const WEIGHTS = {
  personal: 15,
  links: 15,
  about: 15,
  languages: 15,
  experience: 15,
  education: 15,
  skills: 15,
} as const;

export function calculateCvProgress(content: FullCV): number {
  let progress = 0;

  // * personal (object)
  const hasValidPersonal = content.personal.some((personal) =>
    Boolean(personal.email && personal.firstName && personal.lastName),
  );

  if (hasValidPersonal) {
    progress += WEIGHTS.personal;
  }

  // * links (array of objects)

  const hasValidLinks = content.links.some((link) => Boolean(link.label && link.url));

  if (hasValidLinks) {
    progress += WEIGHTS.links;
  }

  // * about (array of objects)

  const hasValidAbout = content.about.some((about) => Boolean(about.content));

  if (hasValidAbout) {
    progress += WEIGHTS.about;
  }

  // * languages (array of objects)

  const hasValidLanguages = content.languages.some((language) =>
    Boolean(language.name && language.proficiency),
  );

  if (hasValidLanguages) {
    progress += WEIGHTS.languages;
  }

  // * experience (array of objects)

  const hasValidExperience = content.experience.some((exp) =>
    Boolean(exp.position && exp.company && exp.startDate && exp.description),
  );

  if (hasValidExperience) {
    progress += WEIGHTS.experience;
  }

  // * education (array of objects)

  const hasValidEducation = content.education.some((edu) =>
    Boolean(edu.degree && edu.institution && edu.startDate),
  );

  if (hasValidEducation) {
    progress += WEIGHTS.education;
  }

  // * skills (array of objects)

  const hasValidSkills = content.skills.some((skill) => Boolean(skill.title));

  if (hasValidSkills) {
    progress += WEIGHTS.skills;
  }

  return Math.min(progress, 100);
}
