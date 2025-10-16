import { TimeInRangeResult, GMIResult, TimePeriod } from '../models';

// Separate loading/error states for each data type
interface DataState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Updated Clinic Outcomes State with separate states
export interface ClinicOutcomesState {
  // Selected time period
  selectedPeriod: TimePeriod;
  
  // Time in Range Chart State
  timeInRange: DataState<TimeInRangeResult>;
  
  // GMI Chart State
  gmi: DataState<GMIResult>;
}

// Initial state
export const initialState: ClinicOutcomesState = {
  selectedPeriod: 30,
  timeInRange: {
    data: null,
    loading: true,
    error: null
  },
  gmi: {
    data: null,
    loading: true,
    error: null
  }
};