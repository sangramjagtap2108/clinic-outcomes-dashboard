import { createReducer, on } from '@ngrx/store';
import { initialState } from './state';
import * as ClinicOutcomesActions from './actions';

export const clinicOutcomesReducer = createReducer(
  initialState,

  // Period Selection
  on(ClinicOutcomesActions.selectTimePeriod, (state, { period }) => ({
    ...state,
    selectedPeriod: period
  })),

  // Dashboard Data Loading
  on(ClinicOutcomesActions.loadDashboardData, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(ClinicOutcomesActions.loadDashboardDataSuccess, (state, { timeInRangeResult, gmiResult, metadata }) => ({
    ...state,
    timeInRangeResult,
    gmiResult,
    metadata,
    loading: false,
    error: null
  })),

  on(ClinicOutcomesActions.loadDashboardDataFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);