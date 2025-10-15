// Essential constants only
export const GLUCOSE_RANGES = {
  VERY_LOW_MAX: 54,
  LOW_MAX: 69,
  TARGET_MIN: 70,
  TARGET_MAX: 180,
  HIGH_MAX: 250
} as const;

export const GMI_RANGES = {
  TARGET_MAX: 7.0,
  ABOVE_MAX: 8.0
} as const;

export const MIN_READINGS_FOR_ACTIVE = 3;

export const TIME_PERIODS = [30, 60, 90] as const;