// API Response interfaces for HTTP calls
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

export interface DashboardApiData {
  patientCount: number;
  period: number;
  dataGeneratedDate: string;
  timeInRange: {
    veryLow: number;
    low: number;
    target: number;
    high: number;
    veryHigh: number;
  };
  gmi: {
    averageGMI: number;
    target: number;
    above: number;
    high: number;
  };
}

// Type alias for the complete API response
export type DashboardApiResponse = ApiResponse<DashboardApiData>;