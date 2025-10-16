import { createReducer, on } from '@ngrx/store';
import { initialState } from './state';
import * as ClinicOutcomesActions from './actions';

export const clinicOutcomesReducer = createReducer(
  initialState,

  // Time in Range Actions
  on(ClinicOutcomesActions.loadTimeInRangeData, (state, { period }) => ({
    ...state,
    selectedPeriod: period,
    timeInRange: {
      ...state.timeInRange,
      loading: true,
      error: null
    }
  })),

  on(ClinicOutcomesActions.loadTimeInRangeDataSuccess, (state, { timeInRangeResult }) => ({
    ...state,
    timeInRange: {
      data: timeInRangeResult,
      loading: false,
      error: null
    }
  })),

  on(ClinicOutcomesActions.loadTimeInRangeDataFailure, (state, { error }) => ({
    ...state,
    timeInRange: {
      ...state.timeInRange,
      loading: false,
      error
    }
  })),

  // GMI Actions
  on(ClinicOutcomesActions.loadGMIData, (state, { period }) => ({
    ...state,
    selectedPeriod: period,
    gmi: {
      ...state.gmi,
      loading: true,
      error: null
    }
  })),

  on(ClinicOutcomesActions.loadGMIDataSuccess, (state, { gmiResult }) => ({
    ...state,
    gmi: {
      data: gmiResult,
      loading: false,
      error: null
    }
  })),

  on(ClinicOutcomesActions.loadGMIDataFailure, (state, { error }) => ({
    ...state,
    gmi: {
      ...state.gmi,
      loading: false,
    }
  }))
);