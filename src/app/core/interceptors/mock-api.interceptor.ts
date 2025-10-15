import { HttpRequest, HttpHandlerFn, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { DashboardApiResponse } from '../../shared/models';
import { TimePeriod, TimeInRangeReading, GMIReading } from '../../features/clinic-outcomes/models';
import { getMockTimeInRangeData, getMockGMIData } from '../../features/clinic-outcomes/services/mock-data';

export function mockApiInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  
  // Check if this is a clinic outcomes API call
  if (req.url.includes('/api/clinic-outcomes/dashboard') || req.url.includes('api/clinic-outcomes/dashboard')) {
    
    // Extract period from query parameters
    const period = extractPeriodFromUrl(req.url);
    
    // Get mock response based on period
    const mockResponse = getMockDashboardResponse(period);
    
    // Return mock response with simulated network delay
    return of(new HttpResponse({
      status: 200,
      body: mockResponse
    })).pipe(
      delay(500) // 500ms delay to simulate realistic network behavior
    );
  }

  // For all other requests, proceed normally
  return next(req);
}

function extractPeriodFromUrl(url: string): TimePeriod {
  // Extract period from URL like: /api/clinic-outcomes/dashboard?period=30
  const urlParams = new URLSearchParams(url.split('?')[1] || '');
  const periodParam = urlParams.get('period');
  const period = parseInt(periodParam || '30', 10);
  
  // Validate period and return default if invalid
  return [30, 60, 90].includes(period) ? period as TimePeriod : 30;
}

function getMockDashboardResponse(period: TimePeriod): DashboardApiResponse {
  // Get raw mock data
  const timeInRangeReadings = getMockTimeInRangeData(period);
  const gmiReadings = getMockGMIData(period);
  
  // Process data into API response format
  const processedTimeInRange = processTimeInRangeData(timeInRangeReadings);
  const processedGMI = processGMIData(gmiReadings);
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
function processTimeInRangeData(readings: TimeInRangeReading[]) {
  const activeReadings = getActivePatientReadings(readings);
  const total = activeReadings.length;
  
  if (total === 0) {
    return { veryLow: 0, low: 0, target: 0, high: 0, veryHigh: 0 };
  }
  
  const ranges = {
    veryLow: activeReadings.filter(r => r.value < 54).length,
    low: activeReadings.filter(r => r.value >= 54 && r.value <= 69).length,
    target: activeReadings.filter(r => r.value >= 70 && r.value <= 180).length,
    high: activeReadings.filter(r => r.value >= 181 && r.value <= 250).length,
    veryHigh: activeReadings.filter(r => r.value > 250).length
  };

  return {
    veryLow: Math.round((ranges.veryLow / total) * 100),
    low: Math.round((ranges.low / total) * 100),
    target: Math.round((ranges.target / total) * 100),
    high: Math.round((ranges.high / total) * 100),
    veryHigh: Math.round((ranges.veryHigh / total) * 100)
  };
}

function processGMIData(readings: GMIReading[]) {
  const activeReadings = getActivePatientReadings(readings);
  const total = activeReadings.length;
  
  if (total === 0) {
    return { averageGMI: 0, target: 0, above: 0, high: 0 };
  }
  
  // Calculate average GMI
  const totalGMI = activeReadings.reduce((sum, reading) => sum + reading.value, 0);
  const averageGMI = totalGMI / total;
  
  // Calculate percentage distributions
  const ranges = {
    target: activeReadings.filter(r => r.value <= 7.0).length, // ≤7.0%
    above: activeReadings.filter(r => r.value > 7.0 && r.value <= 8.0).length, // 7.0-8.0%
    high: activeReadings.filter(r => r.value > 8.0).length // >8.0%
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
  
  // Filter patients with 3 or more readings and flatten
  return Object.values(patientReadings)
    .filter(patientData => patientData.length >= 3)
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
  
  // Count patients with 3 or more readings
  return Object.values(patientReadings).filter(count => count >= 3).length;
}