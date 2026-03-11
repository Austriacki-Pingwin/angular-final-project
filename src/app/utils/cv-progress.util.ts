import type { CV } from '../models/collections.model';

const WEIGHTS = {
  personal: 15,
  photo: 15,
  links: 15,
  about: 15,
  languages: 15,
  experience: 15,
  education: 15,
  skills: 15,
} as const;

export function calculateCvProgress(content: CV): number {
  let progress = 0;

  const totalWeight = Object.values(WEIGHTS).reduce((sum, w) => sum + w, 0);

  const hasValidPhoto = Array.isArray(content.photoBlock) && content.photoBlock.length > 0;

  if (hasValidPhoto) {
    progress += WEIGHTS.photo;
  }
  const hasValidPersonal = Array.isArray(content.personalBlock) && content.personalBlock.length > 0;

  if (hasValidPersonal) {
    progress += WEIGHTS.personal;
  }

  const hasValidLinks = Array.isArray(content.linksBlock) && content.linksBlock.length > 0;

  if (hasValidLinks) {
    progress += WEIGHTS.links;
  }

  const hasValidAbout = Array.isArray(content.aboutBlock) && content.aboutBlock.length > 0;

  if (hasValidAbout) {
    progress += WEIGHTS.about;
  }

  const hasValidLanguages =
    Array.isArray(content.languagesBlock) && content.languagesBlock.length > 0;

  if (hasValidLanguages) {
    progress += WEIGHTS.languages;
  }

  const hasValidExperience =
    Array.isArray(content.experienceBlock) && content.experienceBlock.length > 0;

  if (hasValidExperience) {
    progress += WEIGHTS.experience;
  }

  const hasValidEducation =
    Array.isArray(content.educationBlock) && content.educationBlock.length > 0;

  if (hasValidEducation) {
    progress += WEIGHTS.education;
  }

  const hasValidSkills = Array.isArray(content.skillsBlock) && content.skillsBlock.length > 0;

  if (hasValidSkills) {
    progress += WEIGHTS.skills;
  }

  return Math.round((progress / totalWeight) * 100);
}
