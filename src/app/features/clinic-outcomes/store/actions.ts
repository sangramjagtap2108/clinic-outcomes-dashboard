import { createAction, props } from '@ngrx/store';
import { TimeInRangeResult, GMIResult, TimePeriod } from '../models';

// Time in Range Chart Actions
export const loadTimeInRangeData = createAction(
  '[Time in Range] Load Data',
  props<{ period: TimePeriod }>()
);

export const loadTimeInRangeDataSuccess = createAction(
  '[Time in Range] Load Data Success',
  props<{ timeInRangeResult: TimeInRangeResult }>()
);

export const loadTimeInRangeDataFailure = createAction(
  '[Time in Range] Load Data Failure',
  props<{ error: string }>()
);

// GMI Chart Actions
export const loadGMIData = createAction(
  '[GMI] Load Data',
  props<{ period: TimePeriod }>()
);

export const loadGMIDataSuccess = createAction(
  '[GMI] Load Data Success',
  props<{ gmiResult: GMIResult }>()
);

export const loadGMIDataFailure = createAction(
  '[GMI] Load Data Failure',
  props<{ error: string }>()
);