import { createReducer, on } from '@ngrx/store';
import { initialState } from './state';
import * as ClinicOutcomesActions from './actions';

export const clinicOutcomesReducer = createReducer(
  initialState,

  // Dashboard Data Loading (now also sets the selected period atomically)
  on(ClinicOutcomesActions.loadDashboardData, (state, { period }) => ({
    ...state,
    selectedPeriod: period,
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