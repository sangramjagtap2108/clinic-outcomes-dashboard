import { createAction, props } from '@ngrx/store';
import { TimeInRangeResult, GMIResult, DashboardMetadata, TimePeriod } from '../models';

// Period Selection
export const selectTimePeriod = createAction(
  '[Clinic Outcomes] Select Time Period',
  props<{ period: TimePeriod }>()
);

// Load Dashboard Data (single action for everything)
export const loadDashboardData = createAction(
  '[Clinic Outcomes] Load Dashboard Data',
  props<{ period: TimePeriod }>()
);

export const loadDashboardDataSuccess = createAction(
  '[Clinic Outcomes] Load Dashboard Data Success',
  props<{ 
    timeInRangeResult: TimeInRangeResult; 
    gmiResult: GMIResult; 
    metadata: DashboardMetadata;
  }>()
);

export const loadDashboardDataFailure = createAction(
  '[Clinic Outcomes] Load Dashboard Data Failure',
  props<{ error: string }>()
);