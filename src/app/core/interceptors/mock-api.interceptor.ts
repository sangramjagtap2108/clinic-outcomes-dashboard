import { HttpRequest, HttpHandlerFn, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { DashboardApiResponse } from '../../shared/models';
import { TimePeriod, TimeInRangeReading, GMIReading } from '../../features/clinic-outcomes/models';
import { getMockTimeInRangeData, getMockGMIData } from '../../features/clinic-outcomes/services/mock-data';

// Constants for medical ranges
const GLUCOSE_RANGES = {
  VERY_LOW_MAX: 54,
  LOW_MIN: 54,
  LOW_MAX: 69,
  TARGET_MIN: 70,
  TARGET_MAX: 180,
  HIGH_MIN: 181,
  HIGH_MAX: 250
} as const;

const GMI_RANGES = {
  TARGET_MAX: 7.0,
  ABOVE_MIN: 7.0,
  ABOVE_MAX: 8.0,
  HIGH_MIN: 8.0
} as const;

const NETWORK_DELAY_MS = 500;
const MIN_READINGS_PER_PATIENT = 3;

export function mockApiInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  
  // Check if this is a Time in Range API call
  if (req.url.includes('clinic-outcomes/time-in-range')) {
    const period = extractPeriodFromUrl(req.url);
    const mockResponse = getMockTimeInRangeResponse(period);
    
    return of(new HttpResponse({
      status: 200,
      body: mockResponse
    })).pipe(
      delay(NETWORK_DELAY_MS)
    );
  }

  // Check if this is a GMI API call
  if (req.url.includes('clinic-outcomes/gmi')) {
    const period = extractPeriodFromUrl(req.url);
    const mockResponse = getMockGMIResponse(period);
    
    return of(new HttpResponse({
      status: 200,
      body: mockResponse
    })).pipe(
      delay(NETWORK_DELAY_MS)
    );
  }

  // Check if this is a legacy dashboard API call (backward compatibility)
  if (req.url.includes('clinic-outcomes/dashboard')) {
    const period = extractPeriodFromUrl(req.url);
    const mockResponse = getMockDashboardResponse(period);
    
    return of(new HttpResponse({
      status: 200,
      body: mockResponse
    })).pipe(
      delay(NETWORK_DELAY_MS)
    );
  }

  // For all other requests, proceed normally
  return next(req);
}

function extractPeriodFromUrl(url: string): TimePeriod {
  try {
    // Extract period from URL like: /api/clinic-outcomes/dashboard?period=30
    const urlParts = url.split('?');
    if (urlParts.length < 2) {
      return 30; // Default period if no query parameters
    }
    
    const urlParams = new URLSearchParams(urlParts[1]);
    const periodParam = urlParams.get('period');
    const period = parseInt(periodParam || '30', 10);
    
    // Validate period and return default if invalid
    return [30, 60, 90].includes(period) ? period as TimePeriod : 30;
  } catch (error) {
    console.warn('Failed to extract period from URL, using default:', error);
    return 30;
  }
}

function getMockTimeInRangeResponse(period: TimePeriod) {
  // Get raw mock data
  const timeInRangeReadings = getMockTimeInRangeData(period);
  const activeTimeInRangeReadings = getActivePatientReadings(timeInRangeReadings);
  
  // Process data into API response format
  const processedTimeInRange = processTimeInRangeData(activeTimeInRangeReadings);
  const activePatientCount = getActivePatientCount(timeInRangeReadings);
  
  return {
    success: true,
    data: {
      patientCount: activePatientCount,
      period: period,
      dataGeneratedDate: new Date().toISOString().split('T')[0],
      timeInRange: processedTimeInRange
    },
    message: `Time in Range data for ${period} days retrieved successfully`,
    timestamp: new Date().toISOString()
  };
}

function getMockGMIResponse(period: TimePeriod) {
  // Get raw mock data
  const gmiReadings = getMockGMIData(period);
  const activeGmiReadings = getActivePatientReadings(gmiReadings);
  
  // Process data into API response format
  const processedGMI = processGMIData(activeGmiReadings);
  const activePatientCount = getActivePatientCount(gmiReadings);
  
  return {
    success: true,
    data: {
      patientCount: activePatientCount,
      period: period,
      dataGeneratedDate: new Date().toISOString().split('T')[0],
      gmi: processedGMI
    },
    message: `GMI data for ${period} days retrieved successfully`,
    timestamp: new Date().toISOString()
  };
}

function getMockDashboardResponse(period: TimePeriod): DashboardApiResponse {
  // Get raw mock data
  const timeInRangeReadings = getMockTimeInRangeData(period);
  const gmiReadings = getMockGMIData(period);
  
  // Get active patient readings (used by both processing functions)
  const activeTimeInRangeReadings = getActivePatientReadings(timeInRangeReadings);
  const activeGmiReadings = getActivePatientReadings(gmiReadings);
  
  // Process data into API response format
  const processedTimeInRange = processTimeInRangeData(activeTimeInRangeReadings);
  const processedGMI = processGMIData(activeGmiReadings);
  const activePatientCount = getActivePatientCount(timeInRangeReadings);
  
  return {
    success: true,
    data: {
      patientCount: activePatientCount,
      period: period,
      dataGeneratedDate: new Date().toISOString().split('T')[0],
      timeInRange: processedTimeInRange,
      gmi: processedGMI
    },
    message: `Dashboard data for ${period} days retrieved successfully`,
    timestamp: new Date().toISOString()
  };
}

// Data processing functions
function processTimeInRangeData(activeReadings: TimeInRangeReading[]) {
  const total = activeReadings.length;
  
  if (total === 0) {
    return { veryLow: 0, low: 0, target: 0, high: 0, veryHigh: 0 };
  }
  
  const ranges = {
    veryLow: activeReadings.filter(r => r.value < GLUCOSE_RANGES.VERY_LOW_MAX).length,
    low: activeReadings.filter(r => r.value >= GLUCOSE_RANGES.LOW_MIN && r.value <= GLUCOSE_RANGES.LOW_MAX).length,
    target: activeReadings.filter(r => r.value >= GLUCOSE_RANGES.TARGET_MIN && r.value <= GLUCOSE_RANGES.TARGET_MAX).length,
    high: activeReadings.filter(r => r.value >= GLUCOSE_RANGES.HIGH_MIN && r.value <= GLUCOSE_RANGES.HIGH_MAX).length,
    veryHigh: activeReadings.filter(r => r.value > GLUCOSE_RANGES.HIGH_MAX).length
  };

  return {
    veryLow: Math.round((ranges.veryLow / total) * 100),
    low: Math.round((ranges.low / total) * 100),
    target: Math.round((ranges.target / total) * 100),
    high: Math.round((ranges.high / total) * 100),
    veryHigh: Math.round((ranges.veryHigh / total) * 100)
  };
}

function processGMIData(activeReadings: GMIReading[]) {
  const total = activeReadings.length;
  
  if (total === 0) {
    return { averageGMI: 0, target: 0, above: 0, high: 0 };
  }
  
  // Calculate average GMI
  const totalGMI = activeReadings.reduce((sum, reading) => sum + reading.value, 0);
  const averageGMI = totalGMI / total;
  
  // Calculate percentage distributions using constants
  const ranges = {
    target: activeReadings.filter(r => r.value <= GMI_RANGES.TARGET_MAX).length, // ≤7.0%
    above: activeReadings.filter(r => r.value > GMI_RANGES.ABOVE_MIN && r.value <= GMI_RANGES.ABOVE_MAX).length, // 7.0-8.0%
    high: activeReadings.filter(r => r.value > GMI_RANGES.HIGH_MIN).length // >8.0%
  };

  return {
    averageGMI: Math.round(averageGMI * 10) / 10, // Round to 1 decimal place
    target: Math.round((ranges.target / total) * 100),
    above: Math.round((ranges.above / total) * 100),
    high: Math.round((ranges.high / total) * 100)
  };
}

function getActivePatientReadings<T extends { pid: string }>(readings: T[]): T[] {
  // Group readings by patient ID
  const patientReadings = readings.reduce((acc, reading) => {
    if (!acc[reading.pid]) {
      acc[reading.pid] = [];
    }
    acc[reading.pid].push(reading);
    return acc;
  }, {} as Record<string, T[]>);
  
  // Filter patients with minimum required readings and flatten
  return Object.values(patientReadings)
    .filter(patientData => patientData.length >= MIN_READINGS_PER_PATIENT)
    .flat();
}

function getActivePatientCount(readings: TimeInRangeReading[]): number {
  // Group readings by patient ID
  const patientReadings = readings.reduce((acc, reading) => {
    if (!acc[reading.pid]) {
      acc[reading.pid] = 0;
    }
    acc[reading.pid]++;
    return acc;
  }, {} as Record<string, number>);
  
  // Count patients with minimum required readings
  return Object.values(patientReadings).filter(count => count >= MIN_READINGS_PER_PATIENT).length;
}