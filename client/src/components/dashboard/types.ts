export interface Trip {
  id: string;
  destination: string;
  subRegion?: string;
  country: string;
  flag: string;
  duration: string;
  date: string;
  daysRemaining: number;
  budget: number;
  image: string;
  travelBuddies: { name: string; avatar: string }[];
}
