
export type Direction = 'hike' | 'hold' | 'cut';

export type YearProjection = {
  year: string;
  value: number | null;
};

export type ForecastData = {
  direction: Direction | null;
  rate: number | null;
  confidence: number;
  comment: string;
  dotPlotProjections: YearProjection[];
  timestamp: Date;
};
