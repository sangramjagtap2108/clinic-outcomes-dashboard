// Essential data models
export interface TimeInRangeReading {
  pid: string;
  value: number;
}

export interface GMIReading {
  pid: string;
  value: number;
}

// Time period type
export type TimePeriod = 30 | 60 | 90;

// Processed results for charts
export interface TimeInRangeResult {
  veryLow: number;
  low: number;
  target: number;
  high: number;
  veryHigh: number;
  activePatientCount: number;
  totalReadings: number;
}

export interface GMIResult {
  target: number;
  above: number;
  high: number;
  averageGMI: number;
  activePatientCount: number;
  totalReadings: number;
}