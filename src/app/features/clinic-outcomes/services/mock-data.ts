// Mock data for Time in Range and GMI
import { TimeInRangeReading, GMIReading, TimePeriod } from '../models';

// Time in Range Mock Data - 30 days
export const TIME_IN_RANGE_30_DAYS: TimeInRangeReading[] = [
  // Active patients (>=3 readings)
  {"pid":"P001","value":163},{"pid":"P001","value":186},{"pid":"P001","value":62},{"pid":"P001","value":69},{"pid":"P001","value":195},
  {"pid":"P002","value":131},{"pid":"P002","value":268},{"pid":"P002","value":189},{"pid":"P002","value":125},
  {"pid":"P003","value":180},{"pid":"P003","value":177},{"pid":"P003","value":135},{"pid":"P003","value":58},{"pid":"P003","value":98},
  {"pid":"P004","value":231},{"pid":"P004","value":58},{"pid":"P004","value":66},{"pid":"P004","value":57},
  {"pid":"P005","value":141},{"pid":"P005","value":113},{"pid":"P005","value":114},{"pid":"P005","value":167},{"pid":"P005","value":67},
  {"pid":"P006","value":162},{"pid":"P006","value":63},{"pid":"P006","value":107},
  {"pid":"P007","value":189},{"pid":"P007","value":93},{"pid":"P007","value":225},{"pid":"P007","value":156},
  
  // Inactive patients (<3 readings) - should be filtered out
  {"pid":"P101","value":145},{"pid":"P101","value":172}, // Only 2 readings
  {"pid":"P102","value":89}, // Only 1 reading
  {"pid":"P103","value":203},{"pid":"P103","value":187} // Only 2 readings
];

// Time in Range Mock Data - 60 days (includes 30 days + additional data)
export const TIME_IN_RANGE_60_DAYS: TimeInRangeReading[] = [
  ...TIME_IN_RANGE_30_DAYS,
  // Additional active patients
  {"pid":"P001","value":145},{"pid":"P001","value":172},
  {"pid":"P002","value":198},{"pid":"P002","value":87},{"pid":"P002","value":134},
  {"pid":"P003","value":176},{"pid":"P003","value":92},
  {"pid":"P004","value":123},{"pid":"P004","value":165},
  {"pid":"P005","value":178},{"pid":"P005","value":95},
  {"pid":"P006","value":134},{"pid":"P006","value":189},{"pid":"P006","value":156},
  {"pid":"P007","value":112},{"pid":"P007","value":145},
  {"pid":"P008","value":167},{"pid":"P008","value":198},{"pid":"P008","value":123},{"pid":"P008","value":165},
  
  // Additional inactive patients
  {"pid":"P104","value":176},{"pid":"P104","value":143}, // Only 2 readings total
  {"pid":"P105","value":187} // Only 1 reading total
];

// Time in Range Mock Data - 90 days (includes 60 days + additional data)
export const TIME_IN_RANGE_90_DAYS: TimeInRangeReading[] = [
  ...TIME_IN_RANGE_60_DAYS,
  // Additional active patients
  {"pid":"P001","value":167},{"pid":"P001","value":134},
  {"pid":"P002","value":201},{"pid":"P002","value":89},
  {"pid":"P003","value":156},{"pid":"P003","value":143},
  {"pid":"P004","value":187},{"pid":"P004","value":76},
  {"pid":"P005","value":198},{"pid":"P005","value":165},
  {"pid":"P006","value":154},{"pid":"P006","value":132},
  {"pid":"P007","value":189},{"pid":"P007","value":167},
  {"pid":"P008","value":145},{"pid":"P008","value":178},
  {"pid":"P009","value":156},{"pid":"P009","value":123},{"pid":"P009","value":198},{"pid":"P009","value":145},
  {"pid":"P010","value":167},{"pid":"P010","value":189},{"pid":"P010","value":134},
  
  // Additional inactive patients
  {"pid":"P106","value":172},{"pid":"P106","value":143}, // Only 2 readings total
  {"pid":"P107","value":165}, // Only 1 reading total
  {"pid":"P108","value":189},{"pid":"P108","value":134} // Only 2 readings total
];

// GMI Mock Data - 30 days
export const GMI_30_DAYS: GMIReading[] = [
  // Active patients (>=3 readings)
  {"pid":"P001","value":6.8},{"pid":"P001","value":6.9},{"pid":"P001","value":6.2},{"pid":"P001","value":6.4},{"pid":"P001","value":7.1},
  {"pid":"P002","value":6.5},{"pid":"P002","value":7.8},{"pid":"P002","value":7.0},{"pid":"P002","value":6.4},
  {"pid":"P003","value":6.7},{"pid":"P003","value":6.8},{"pid":"P003","value":6.5},{"pid":"P003","value":6.3},{"pid":"P003","value":6.6},
  {"pid":"P004","value":7.2},{"pid":"P004","value":6.3},{"pid":"P004","value":6.4},{"pid":"P004","value":6.2},
  {"pid":"P005","value":6.6},{"pid":"P005","value":6.4},{"pid":"P005","value":6.4},{"pid":"P005","value":6.8},{"pid":"P005","value":6.3},
  {"pid":"P006","value":6.7},{"pid":"P006","value":6.2},{"pid":"P006","value":6.5},
  {"pid":"P007","value":7.0},{"pid":"P007","value":6.6},{"pid":"P007","value":7.4},{"pid":"P007","value":6.7},
  
  // Inactive patients (<3 readings) - should be filtered out
  {"pid":"P101","value":6.6},{"pid":"P101","value":6.8}, // Only 2 readings
  {"pid":"P102","value":6.5}, // Only 1 reading
  {"pid":"P103","value":7.0},{"pid":"P103","value":7.1} // Only 2 readings
];

// GMI Mock Data - 60 days (includes 30 days + additional data)
export const GMI_60_DAYS: GMIReading[] = [
  ...GMI_30_DAYS,
  // Additional active patients
  {"pid":"P001","value":6.6},{"pid":"P001","value":6.8},
  {"pid":"P002","value":6.5},{"pid":"P002","value":6.7},{"pid":"P002","value":7.0},
  {"pid":"P003","value":7.1},{"pid":"P003","value":6.5},
  {"pid":"P004","value":6.6},{"pid":"P004","value":6.8},
  {"pid":"P005","value":6.6},{"pid":"P005","value":6.4},
  {"pid":"P006","value":6.7},{"pid":"P006","value":6.8},{"pid":"P006","value":6.6},
  {"pid":"P007","value":6.5},{"pid":"P007","value":7.0},
  {"pid":"P008","value":6.7},{"pid":"P008","value":6.4},{"pid":"P008","value":6.6},{"pid":"P008","value":6.8},
  
  // Additional inactive patients
  {"pid":"P104","value":7.1},{"pid":"P104","value":6.4}, // Only 2 readings total
  {"pid":"P105","value":6.7} // Only 1 reading total
];

// GMI Mock Data - 90 days (includes 60 days + additional data)
export const GMI_90_DAYS: GMIReading[] = [
  ...GMI_60_DAYS,
  // Additional active patients
  {"pid":"P001","value":6.8},{"pid":"P001","value":6.5},
  {"pid":"P002","value":7.0},{"pid":"P002","value":6.5},
  {"pid":"P003","value":6.7},{"pid":"P003","value":6.6},
  {"pid":"P004","value":7.0},{"pid":"P004","value":6.4},
  {"pid":"P005","value":7.1},{"pid":"P005","value":6.7},
  {"pid":"P006","value":6.7},{"pid":"P006","value":6.5},
  {"pid":"P007","value":7.0},{"pid":"P007","value":6.8},
  {"pid":"P008","value":6.6},{"pid":"P008","value":6.8},
  {"pid":"P009","value":6.7},{"pid":"P009","value":6.4},{"pid":"P009","value":7.1},{"pid":"P009","value":6.6},
  {"pid":"P010","value":6.8},{"pid":"P010","value":7.0},{"pid":"P010","value":6.5},
  
  // Additional inactive patients
  {"pid":"P106","value":6.7},{"pid":"P106","value":6.8}, // Only 2 readings total
  {"pid":"P107","value":6.6}, // Only 1 reading total
  {"pid":"P108","value":7.0},{"pid":"P108","value":6.5} // Only 2 readings total
];

// Helper function to get data by period
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