import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClinicOutcomesState } from './state';

// Feature selector
export const selectClinicOutcomesState = createFeatureSelector<ClinicOutcomesState>('clinicOutcomes');

// Period selector
export const selectSelectedPeriod = createSelector(
  selectClinicOutcomesState,
  (state) => state.selectedPeriod
);

// Time in Range selectors
export const selectTimeInRangeState = createSelector(
  selectClinicOutcomesState,
  (state) => state.timeInRange
);

export const selectTimeInRangeResult = createSelector(
  selectTimeInRangeState,
  (timeInRangeState) => timeInRangeState.data
);

export const selectTimeInRangeLoading = createSelector(
  selectTimeInRangeState,
  (timeInRangeState) => timeInRangeState.loading
);

export const selectTimeInRangeError = createSelector(
  selectTimeInRangeState,
  (timeInRangeState) => timeInRangeState.error
);

// GMI selectors
export const selectGMIState = createSelector(
  selectClinicOutcomesState,
  (state) => state.gmi
);

export const selectGMIResult = createSelector(
  selectGMIState,
  (gmiState) => gmiState.data
);

export const selectGMILoading = createSelector(
  selectGMIState,
  (gmiState) => gmiState.loading
);

export const selectGMIError = createSelector(
  selectGMIState,
  (gmiState) => gmiState.error
);

// Computed metadata selectors (generated locally)
export const selectMetadata = createSelector(
  selectSelectedPeriod,
  selectTimeInRangeResult,
  selectGMIResult,
  (selectedPeriod, timeInRangeData, gmiData) => {
    // Generate date range based on selected period
    const endDate = new Date();
    const startDate = new Date();
    const periodDays = typeof selectedPeriod === 'number' ? selectedPeriod : 30;
    startDate.setDate(endDate.getDate() - periodDays);
    
    return {
      dateRange: {
        start: startDate.toLocaleDateString(),
        end: endDate.toLocaleDateString()
      },
      lastUpdated: new Date().toLocaleString(),
      selectedPeriod: selectedPeriod || 30
    };
  }
);

// Combined loading state (simplified)
export const selectLoading = createSelector(
  selectTimeInRangeLoading,
  selectGMILoading,
  (timeInRangeLoading, gmiLoading) => timeInRangeLoading || gmiLoading
);

// Combined error state
export const selectError = createSelector(
  selectTimeInRangeError,
  selectGMIError,
  (timeInRangeError, gmiError) => timeInRangeError || gmiError
);

// Combined dashboard data (backward compatibility)
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