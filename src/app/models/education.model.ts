// * Education Model

export type Education = {
  id: string;
  degree: string;
  institution: string;
  location?: string;
  startDate: string; //? YYYY-MM
  endDate?: string;
  description?: string;
};
