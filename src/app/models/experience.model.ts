// * Experience Model

export type Experience = {
  id: string;
  position: string;
  company: string;
  location?: string;
  startDate: string; //? YYYY-MM
  endDate?: string; //? YYYY-MM | undefined = present
  description: string;
};
