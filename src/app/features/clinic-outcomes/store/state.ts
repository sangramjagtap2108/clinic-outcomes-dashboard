import { TimeInRangeResult, GMIResult, DashboardMetadata, TimePeriod } from '../models';

// Simplified Clinic Outcomes State
export interface ClinicOutcomesState {
  // Selected time period
  selectedPeriod: TimePeriod;
  
  // Processed data (ready for charts)
  timeInRangeResult: TimeInRangeResult | null;
  gmiResult: GMIResult | null;
  metadata: DashboardMetadata | null;
  
  // Loading states
  loading: boolean;
  error: string | null;
}

// Initial state
export const initialState: ClinicOutcomesState = {
  selectedPeriod: 30,
  timeInRangeResult: null,
  gmiResult: null,
  metadata: null,
  loading: true,
  error: null
};