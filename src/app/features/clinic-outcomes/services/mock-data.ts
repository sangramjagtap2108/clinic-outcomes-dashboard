// Mock data for Time in Range and GMI - Comprehensive and Diverse Scenarios
import { TimeInRangeReading, GMIReading, TimePeriod } from '../models';

// Time in Range Mock Data - 30 days
export const TIME_IN_RANGE_30_DAYS: TimeInRangeReading[] = [
  // === WELL-CONTROLLED PATIENTS (mostly target range) ===
  // Patient P001 - Excellent control (mostly 70-180)
  {"pid":"P001","value":142},{"pid":"P001","value":156},{"pid":"P001","value":128},{"pid":"P001","value":165},{"pid":"P001","value":148},
  {"pid":"P001","value":175},{"pid":"P001","value":133},{"pid":"P001","value":159},{"pid":"P001","value":144},{"pid":"P001","value":167},
  
  // Patient P002 - Good control with occasional highs
  {"pid":"P002","value":145},{"pid":"P002","value":189},{"pid":"P002","value":123},{"pid":"P002","value":156},{"pid":"P002","value":134},
  {"pid":"P002","value":198},{"pid":"P002","value":167},{"pid":"P002","value":145},
  
  // === MODERATELY CONTROLLED PATIENTS ===
  // Patient P003 - Mixed control (target + some highs)
  {"pid":"P003","value":167},{"pid":"P003","value":201},{"pid":"P003","value":89},{"pid":"P003","value":156},{"pid":"P003","value":223},
  {"pid":"P003","value":145},{"pid":"P003","value":178},{"pid":"P003","value":134},
  
  // Patient P004 - Variable control (all ranges represented)
  {"pid":"P004","value":45},{"pid":"P004","value":67},{"pid":"P004","value":145},{"pid":"P004","value":189},{"pid":"P004","value":267},
  {"pid":"P004","value":156},{"pid":"P004","value":234},
  
  // === POORLY CONTROLLED PATIENTS ===
  // Patient P005 - Frequent highs
  {"pid":"P005","value":234},{"pid":"P005","value":267},{"pid":"P005","value":298},{"pid":"P005","value":189},{"pid":"P005","value":245},
  {"pid":"P005","value":201},{"pid":"P005","value":278},
  
  // Patient P006 - Frequent lows (hypoglycemia risk)
  {"pid":"P006","value":34},{"pid":"P006","value":47},{"pid":"P006","value":56},{"pid":"P006","value":42},{"pid":"P006","value":65},
  {"pid":"P006","value":145},{"pid":"P006","value":167},
  
  // === EXTREME CASES ===
  // Patient P007 - Very extreme values
  {"pid":"P007","value":25},{"pid":"P007","value":320},{"pid":"P007","value":12},{"pid":"P007","value":389},{"pid":"P007","value":156},
  
  // Patient P008 - Borderline values (testing category boundaries)
  {"pid":"P008","value":53},{"pid":"P008","value":54},{"pid":"P008","value":69},{"pid":"P008","value":70},{"pid":"P008","value":180},
  {"pid":"P008","value":181},{"pid":"P008","value":250},{"pid":"P008","value":251},
  
  // === NEW PATIENTS (More diverse scenarios) ===
  // Patient P009 - Dawn phenomenon (morning highs)
  {"pid":"P009","value":298},{"pid":"P009","value":245},{"pid":"P009","value":167},{"pid":"P009","value":145},{"pid":"P009","value":234},
  {"pid":"P009","value":156},{"pid":"P009","value":189},
  
  // Patient P010 - Post-meal spikes
  {"pid":"P010","value":156},{"pid":"P010","value":289},{"pid":"P010","value":145},{"pid":"P010","value":267},{"pid":"P010","value":134},
  {"pid":"P010","value":245},{"pid":"P010","value":178},
  
  // Patient P011 - Exercise-induced lows
  {"pid":"P011","value":145},{"pid":"P011","value":38},{"pid":"P011","value":167},{"pid":"P011","value":45},{"pid":"P011","value":156},
  {"pid":"P011","value":52},{"pid":"P011","value":134},
  
  // Patient P012 - Stress-related highs
  {"pid":"P012","value":267},{"pid":"P012","value":234},{"pid":"P012","value":298},{"pid":"P012","value":201},{"pid":"P012","value":245},
  
  // === INACTIVE PATIENTS (<3 readings) - Will be filtered out ===
  {"pid":"P101","value":145},{"pid":"P101","value":172}, // Only 2 readings
  {"pid":"P102","value":89}, // Only 1 reading
  {"pid":"P103","value":203},{"pid":"P103","value":187}, // Only 2 readings
  {"pid":"P104","value":345} // Only 1 reading - extreme value
];

// Time in Range Mock Data - 60 days (includes 30 days + additional diverse data)
export const TIME_IN_RANGE_60_DAYS: TimeInRangeReading[] = [
  ...TIME_IN_RANGE_30_DAYS,
  
  // === ADDITIONAL MONTH DATA - PROGRESSION SCENARIOS ===
  // P001 - Maintaining excellent control
  {"pid":"P001","value":139},{"pid":"P001","value":162},{"pid":"P001","value":148},{"pid":"P001","value":175},
  
  // P002 - Improving control (fewer highs)
  {"pid":"P002","value":145},{"pid":"P002","value":167},{"pid":"P002","value":156},{"pid":"P002","value":134},
  
  // P003 - Worsening control (more highs)
  {"pid":"P003","value":245},{"pid":"P003","value":267},{"pid":"P003","value":234},{"pid":"P003","value":289},
  
  // P004 - Stabilizing (less variability)
  {"pid":"P004","value":156},{"pid":"P004","value":167},{"pid":"P004","value":145},{"pid":"P004","value":178},
  
  // P005 - Still poorly controlled
  {"pid":"P005","value":278},{"pid":"P005","value":234},{"pid":"P005","value":298},{"pid":"P005","value":267},
  
  // P006 - Addressing hypoglycemia (higher targets)
  {"pid":"P006","value":89},{"pid":"P006","value":95},{"pid":"P006","value":112},{"pid":"P006","value":134},
  
  // P007 - Extreme variability continues
  {"pid":"P007","value":18},{"pid":"P007","value":345},{"pid":"P007","value":29},{"pid":"P007","value":298},
  
  // P008 - Testing more boundaries
  {"pid":"P008","value":70},{"pid":"P008","value":180},{"pid":"P008","value":181},{"pid":"P008","value":250},
  
  // === NEW PATIENTS FOR 60-DAY COHORT ===
  // P013 - Newly diagnosed (erratic control)
  {"pid":"P013","value":298},{"pid":"P013","value":45},{"pid":"P013","value":234},{"pid":"P013","value":67},{"pid":"P013","value":267},
  
  // P014 - Medication adjustment period
  {"pid":"P014","value":234},{"pid":"P014","value":189},{"pid":"P014","value":167},{"pid":"P014","value":145},{"pid":"P014","value":134},
  
  // P015 - Seasonal variation (holiday eating)
  {"pid":"P015","value":189},{"pid":"P015","value":234},{"pid":"P015","value":267},{"pid":"P015","value":201},
  
  // === MORE INACTIVE PATIENTS ===
  {"pid":"P105","value":123},{"pid":"P105","value":189}, // Only 2 readings
  {"pid":"P106","value":267} // Only 1 reading
];

// Time in Range Mock Data - 90 days (includes 60 days + seasonal/long-term data)
export const TIME_IN_RANGE_90_DAYS: TimeInRangeReading[] = [
  ...TIME_IN_RANGE_60_DAYS,
  
  // === LONG-TERM PROGRESSION (Third month) ===
  // P001 - Continued excellence
  {"pid":"P001","value":142},{"pid":"P001","value":158},{"pid":"P001","value":165},{"pid":"P001","value":149},
  
  // P002 - Sustained improvement
  {"pid":"P002","value":156},{"pid":"P002","value":134},{"pid":"P002","value":167},{"pid":"P002","value":145},
  
  // P003 - Intervention needed (consistently high)
  {"pid":"P003","value":267},{"pid":"P003","value":298},{"pid":"P003","value":234},{"pid":"P003","value":278},
  
  // P004 - Stable but needs fine-tuning
  {"pid":"P004","value":189},{"pid":"P004","value":167},{"pid":"P004","value":145},{"pid":"P004","value":201},
  
  // P005 - Emergency intervention (dangerous highs)
  {"pid":"P005","value":345},{"pid":"P005","value":389},{"pid":"P005","value":298},{"pid":"P005","value":267},
  
  // P006 - Hypoglycemia resolved
  {"pid":"P006","value":134},{"pid":"P006","value":145},{"pid":"P006","value":156},{"pid":"P006","value":167},
  
  // === COMPREHENSIVE SCENARIO PATIENTS ===
  // P016 - Pregnancy-related changes (tighter targets)
  {"pid":"P016","value":89},{"pid":"P016","value":95},{"pid":"P016","value":112},{"pid":"P016","value":134},{"pid":"P016","value":145},
  
  // P017 - Elderly patient (relaxed targets)
  {"pid":"P017","value":156},{"pid":"P017","value":189},{"pid":"P017","value":167},{"pid":"P017","value":201},
  
  // P018 - Athletic patient (exercise variability)
  {"pid":"P018","value":67},{"pid":"P018","value":145},{"pid":"P018","value":89},{"pid":"P018","value":167},{"pid":"P018","value":123},
  
  // P019 - Shift worker (circadian disruption)
  {"pid":"P019","value":234},{"pid":"P019","value":89},{"pid":"P019","value":267},{"pid":"P019","value":123},{"pid":"P019","value":201},
  
  // P020 - Technology adopter (CGM user - more stable)
  {"pid":"P020","value":145},{"pid":"P020","value":156},{"pid":"P020","value":134},{"pid":"P020","value":167},{"pid":"P020","value":149},
  
  // === EDGE CASE PATIENTS ===
  // P021 - Sensor accuracy issues (some extreme outliers)
  {"pid":"P021","value":5},{"pid":"P021","value":156},{"pid":"P021","value":450},{"pid":"P021","value":134},
  
  // P022 - Perfect control (testing 100% time in range)
  {"pid":"P022","value":145},{"pid":"P022","value":156},{"pid":"P022","value":134},{"pid":"P022","value":167},{"pid":"P022","value":149},
  {"pid":"P022","value":159},{"pid":"P022","value":143},{"pid":"P022","value":162},
  
  // === MORE INACTIVE PATIENTS ===
  {"pid":"P107","value":189},{"pid":"P107","value":234}, // Only 2 readings
  {"pid":"P108","value":345}, // Only 1 reading
  {"pid":"P109","value":67},{"pid":"P109","value":123} // Only 2 readings
];

// GMI Mock Data - 30 days (Comprehensive scenarios matching Time in Range patients)
export const GMI_30_DAYS: GMIReading[] = [
  // === WELL-CONTROLLED PATIENTS (GMI ≤7.0) ===
  // Patient P001 - Excellent control (GMI ~6.5)
  {"pid":"P001","value":6.4},{"pid":"P001","value":6.6},{"pid":"P001","value":6.3},{"pid":"P001","value":6.7},{"pid":"P001","value":6.5},
  {"pid":"P001","value":6.8},{"pid":"P001","value":6.4},{"pid":"P001","value":6.6},{"pid":"P001","value":6.5},{"pid":"P001","value":6.7},
  
  // Patient P002 - Good control with slight elevation (GMI ~6.8)
  {"pid":"P002","value":6.6},{"pid":"P002","value":7.0},{"pid":"P002","value":6.4},{"pid":"P002","value":6.7},{"pid":"P002","value":6.5},
  {"pid":"P002","value":7.1},{"pid":"P002","value":6.8},{"pid":"P002","value":6.6},
  
  // === MODERATELY CONTROLLED PATIENTS (GMI 7.0-8.0) ===
  // Patient P003 - Moderate control (GMI ~7.3)
  {"pid":"P003","value":6.8},{"pid":"P003","value":7.4},{"pid":"P003","value":6.5},{"pid":"P003","value":6.7},{"pid":"P003","value":7.6},
  {"pid":"P003","value":6.6},{"pid":"P003","value":7.2},{"pid":"P003","value":6.5},
  
  // Patient P004 - Variable control (GMI ~7.5)
  {"pid":"P004","value":5.8},{"pid":"P004","value":6.3},{"pid":"P004","value":6.6},{"pid":"P004","value":7.0},{"pid":"P004","value":8.2},
  {"pid":"P004","value":6.7},{"pid":"P004","value":7.8},
  
  // === POORLY CONTROLLED PATIENTS (GMI >8.0) ===
  // Patient P005 - Poor control (GMI ~8.5)
  {"pid":"P005","value":7.8},{"pid":"P005","value":8.2},{"pid":"P005","value":9.1},{"pid":"P005","value":7.0},{"pid":"P005","value":8.7},
  {"pid":"P005","value":7.4},{"pid":"P005","value":8.9},
  
  // Patient P006 - Hypoglycemia risk (lower GMI but concerning)
  {"pid":"P006","value":5.2},{"pid":"P006","value":5.7},{"pid":"P006","value":6.1},{"pid":"P006","value":5.5},{"pid":"P006","value":6.2},
  {"pid":"P006","value":6.6},{"pid":"P006","value":6.8},
  
  // === EXTREME CASES ===
  // Patient P007 - Very extreme variability
  {"pid":"P007","value":4.1},{"pid":"P007","value":11.2},{"pid":"P007","value":3.8},{"pid":"P007","value":12.5},{"pid":"P007","value":6.7},
  
  // Patient P008 - Borderline values (testing GMI boundaries)
  {"pid":"P008","value":6.9},{"pid":"P008","value":7.0},{"pid":"P008","value":7.1},{"pid":"P008","value":7.9},{"pid":"P008","value":8.0},
  {"pid":"P008","value":8.1},{"pid":"P008","value":8.2},{"pid":"P008","value":8.3},
  
  // === NEW DIVERSE PATIENTS ===
  // Patient P009 - Dawn phenomenon (morning highs affect GMI)
  {"pid":"P009","value":9.1},{"pid":"P009","value":8.7},{"pid":"P009","value":6.8},{"pid":"P009","value":6.6},{"pid":"P009","value":7.8},
  {"pid":"P009","value":6.7},{"pid":"P009","value":7.0},
  
  // Patient P010 - Post-meal spikes
  {"pid":"P010","value":6.7},{"pid":"P010","value":8.8},{"pid":"P010","value":6.6},{"pid":"P010","value":8.2},{"pid":"P010","value":6.5},
  {"pid":"P010","value":8.7},{"pid":"P010","value":7.2},
  
  // Patient P011 - Exercise-induced variability
  {"pid":"P011","value":6.6},{"pid":"P011","value":5.3},{"pid":"P011","value":6.8},{"pid":"P011","value":5.7},{"pid":"P011","value":6.7},
  {"pid":"P011","value":5.9},{"pid":"P011","value":6.5},
  
  // Patient P012 - Stress-related elevations
  {"pid":"P012","value":8.2},{"pid":"P012","value":7.8},{"pid":"P012","value":9.1},{"pid":"P012","value":7.4},{"pid":"P012","value":8.7},
  
  // === INACTIVE PATIENTS (<3 readings) - Will be filtered out ===
  {"pid":"P101","value":6.6},{"pid":"P101","value":6.8}, // Only 2 readings
  {"pid":"P102","value":6.5}, // Only 1 reading
  {"pid":"P103","value":7.4},{"pid":"P103","value":7.1}, // Only 2 readings
  {"pid":"P104","value":11.8} // Only 1 reading - extreme value
];

// GMI Mock Data - 60 days (includes 30 days + progression data)
export const GMI_60_DAYS: GMIReading[] = [
  ...GMI_30_DAYS,
  
  // === ADDITIONAL MONTH DATA - GMI PROGRESSION ===
  // P001 - Maintaining excellent control
  {"pid":"P001","value":6.5},{"pid":"P001","value":6.7},{"pid":"P001","value":6.4},{"pid":"P001","value":6.8},
  
  // P002 - Slight improvement (lower GMI)
  {"pid":"P002","value":6.6},{"pid":"P002","value":6.8},{"pid":"P002","value":6.7},{"pid":"P002","value":6.5},
  
  // P003 - Worsening control (higher GMI)
  {"pid":"P003","value":8.7},{"pid":"P003","value":8.2},{"pid":"P003","value":7.8},{"pid":"P003","value":8.8},
  
  // P004 - Stabilizing (less variability)
  {"pid":"P004","value":6.7},{"pid":"P004","value":6.8},{"pid":"P004","value":6.6},{"pid":"P004","value":7.2},
  
  // P005 - Still poorly controlled
  {"pid":"P005","value":8.9},{"pid":"P005","value":7.8},{"pid":"P005","value":9.1},{"pid":"P005","value":8.2},
  
  // P006 - Addressing hypoglycemia (higher but safer GMI)
  {"pid":"P006","value":6.5},{"pid":"P006","value":6.6},{"pid":"P006","value":6.4},{"pid":"P006","value":6.5},
  
  // P007 - Extreme variability continues
  {"pid":"P007","value":3.2},{"pid":"P007","value":11.8},{"pid":"P007","value":4.1},{"pid":"P007","value":9.7},
  
  // P008 - More boundary testing
  {"pid":"P008","value":7.0},{"pid":"P008","value":8.0},{"pid":"P008","value":8.1},{"pid":"P008","value":8.2},
  
  // === NEW 60-DAY COHORT PATIENTS ===
  // P013 - Newly diagnosed (erratic GMI)
  {"pid":"P013","value":9.1},{"pid":"P013","value":5.7},{"pid":"P013","value":7.8},{"pid":"P013","value":6.3},{"pid":"P013","value":8.2},
  
  // P014 - Medication adjustment period
  {"pid":"P014","value":7.8},{"pid":"P014","value":7.0},{"pid":"P014","value":6.8},{"pid":"P014","value":6.6},{"pid":"P014","value":6.5},
  
  // P015 - Seasonal variation (holiday impact)
  {"pid":"P015","value":7.0},{"pid":"P015","value":7.8},{"pid":"P015","value":8.2},{"pid":"P015","value":7.4},
  
  // === MORE INACTIVE PATIENTS ===
  {"pid":"P105","value":6.4},{"pid":"P105","value":7.0}, // Only 2 readings
  {"pid":"P106","value":8.2} // Only 1 reading
];

// GMI Mock Data - 90 days (includes 60 days + long-term progression)
export const GMI_90_DAYS: GMIReading[] = [
  ...GMI_60_DAYS,
  
  // === LONG-TERM GMI PROGRESSION (Third month) ===
  // P001 - Sustained excellence
  {"pid":"P001","value":6.4},{"pid":"P001","value":6.6},{"pid":"P001","value":6.7},{"pid":"P001","value":6.5},
  
  // P002 - Continued improvement
  {"pid":"P002","value":6.7},{"pid":"P002","value":6.5},{"pid":"P002","value":6.8},{"pid":"P002","value":6.6},
  
  // P003 - Requiring intervention
  {"pid":"P003","value":8.2},{"pid":"P003","value":9.1},{"pid":"P003","value":7.8},{"pid":"P003","value":8.9},
  
  // P004 - Stable improvement
  {"pid":"P004","value":7.0},{"pid":"P004","value":6.8},{"pid":"P004","value":6.6},{"pid":"P004","value":7.4},
  
  // P005 - Critical intervention needed
  {"pid":"P005","value":11.2},{"pid":"P005","value":12.8},{"pid":"P005","value":9.1},{"pid":"P005","value":8.2},
  
  // P006 - Hypoglycemia resolved
  {"pid":"P006","value":6.5},{"pid":"P006","value":6.6},{"pid":"P006","value":6.7},{"pid":"P006","value":6.8},
  
  // === COMPREHENSIVE SCENARIO PATIENTS ===
  // P016 - Pregnancy (tighter GMI targets)
  {"pid":"P016","value":6.2},{"pid":"P016","value":6.3},{"pid":"P016","value":6.4},{"pid":"P016","value":6.5},{"pid":"P016","value":6.6},
  
  // P017 - Elderly patient (relaxed GMI targets)
  {"pid":"P017","value":6.7},{"pid":"P017","value":7.0},{"pid":"P017","value":6.8},{"pid":"P017","value":7.4},
  
  // P018 - Athletic patient
  {"pid":"P018","value":6.3},{"pid":"P018","value":6.6},{"pid":"P018","value":6.5},{"pid":"P018","value":6.8},{"pid":"P018","value":6.4},
  
  // P019 - Shift worker (disrupted patterns)
  {"pid":"P019","value":7.8},{"pid":"P019","value":6.5},{"pid":"P019","value":8.2},{"pid":"P019","value":6.4},{"pid":"P019","value":7.4},
  
  // P020 - Technology adopter (stable GMI)
  {"pid":"P020","value":6.6},{"pid":"P020","value":6.7},{"pid":"P020","value":6.5},{"pid":"P020","value":6.8},{"pid":"P020","value":6.6},
  
  // === EDGE CASE PATIENTS ===
  // P021 - Sensor issues (outlier GMI values)
  {"pid":"P021","value":2.1},{"pid":"P021","value":6.7},{"pid":"P021","value":15.2},{"pid":"P021","value":6.5},
  
  // P022 - Perfect control (optimal GMI)
  {"pid":"P022","value":6.6},{"pid":"P022","value":6.7},{"pid":"P022","value":6.5},{"pid":"P022","value":6.8},{"pid":"P022","value":6.6},
  {"pid":"P022","value":6.7},{"pid":"P022","value":6.5},{"pid":"P022","value":6.9},
  
  // === MORE INACTIVE PATIENTS ===
  {"pid":"P107","value":7.0},{"pid":"P107","value":7.8}, // Only 2 readings
  {"pid":"P108","value":11.2}, // Only 1 reading
  {"pid":"P109","value":6.3},{"pid":"P109","value":6.4} // Only 2 readings
];

// Helper functions to get data by period
export const getMockTimeInRangeData = (period: TimePeriod): TimeInRangeReading[] => {
  switch (period) {
    case 30: return TIME_IN_RANGE_30_DAYS;
    case 60: return TIME_IN_RANGE_60_DAYS;
    case 90: return TIME_IN_RANGE_90_DAYS;
    default: return TIME_IN_RANGE_30_DAYS;
  }
};

export const getMockGMIData = (period: TimePeriod): GMIReading[] => {
  switch (period) {
    case 30: return GMI_30_DAYS;
    case 60: return GMI_60_DAYS;
    case 90: return GMI_90_DAYS;
    default: return GMI_30_DAYS;
  }
};