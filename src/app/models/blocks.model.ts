export type Proficiency = 'Beginner' | 'Intermediate' | 'Advanced' | 'Native';

export type Personal = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  location?: string;
  links?: Link[];
};

export type Link = {
  id: string;
  label: string;
  url: string;
};

export type About = {
  id: string;
  content: string;
};

export type Skill = {
  id: string;
  title: string;
};

export type Language = {
  id: string;
  name: string;
  proficiency: Proficiency;
};

export type Experience = {
  id: string;
  position: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description: string;
};
export type Education = {
  id: string;
  degree: string;
  institution: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description?: string;
};
