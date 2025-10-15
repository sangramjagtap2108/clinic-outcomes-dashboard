import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClinicOutcomesState } from './state';

// Feature selector
export const selectClinicOutcomesState = createFeatureSelector<ClinicOutcomesState>('clinicOutcomes');

// Simple selectors
export const selectSelectedPeriod = createSelector(
  selectClinicOutcomesState,
  (state) => state.selectedPeriod
);

export const selectTimeInRangeResult = createSelector(
  selectClinicOutcomesState,
  (state) => state.timeInRangeResult
);

export const selectGMIResult = createSelector(
  selectClinicOutcomesState,
  (state) => state.gmiResult
);

export const selectMetadata = createSelector(
  selectClinicOutcomesState,
  (state) => state.metadata
);

export const selectLoading = createSelector(
  selectClinicOutcomesState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectClinicOutcomesState,
  (state) => state.error
);

// Combined dashboard data
export const selectDashboardData = createSelector(
  selectTimeInRangeResult,
  selectGMIResult,
  selectMetadata,
  selectLoading,
  selectError,
  (timeInRange, gmi, metadata, loading, error) => ({
    timeInRange,
    gmi,
    metadata,
    loading,
    error
  })
);