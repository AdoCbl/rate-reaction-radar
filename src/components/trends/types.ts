
export type YearProjection = {
  year: string;
  value: number | null;
};

export type MeetingForecast = {
  meetingDate: Date;
  clientProjections: {
    year: string;
    median: number;
    dots: number[];
  }[];
  fedProjections: {
    year: string;
    median: number;
  }[];
};
