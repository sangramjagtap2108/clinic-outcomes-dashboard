import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { 
  TimeInRangeReading, 
  GMIReading, 
  TimeInRangeResult, 
  GMIResult, 
  DashboardMetadata, 
  TimePeriod,
  GLUCOSE_RANGES,
  GMI_RANGES,
  MIN_READINGS_FOR_ACTIVE 
} from '../models';
import { getMockTimeInRangeData, getMockGMIData } from './mock-data';

@Injectable({
  providedIn: 'root'
})
export class ClinicOutcomesDataService {

  /**
   * Main method to get processed dashboard data
   */
  getDashboardData(period: TimePeriod): Observable<{
    timeInRangeResult: TimeInRangeResult;
    gmiResult: GMIResult;
    metadata: DashboardMetadata;
  }> {
    // Simulate API call with delay
    return of(null).pipe(
      delay(1000), // Simulate network delay
      map(() => {
        const timeInRangeData = getMockTimeInRangeData(period);
        const gmiData = getMockGMIData(period);

        const timeInRangeResult = this.processTimeInRangeData(timeInRangeData);
        const gmiResult = this.processGMIData(gmiData);
        const metadata = this.generateMetadata(period, timeInRangeResult.activePatientCount);

        return {
          timeInRangeResult,
          gmiResult,
          metadata
        };
      })
    );
  }

  /**
   * Process Time in Range data - filter active patients and calculate percentages
   */
  private processTimeInRangeData(readings: TimeInRangeReading[]): TimeInRangeResult {
    // Step 1: Group readings by patient ID
    const patientReadings = this.groupReadingsByPatient(readings);
    
    // Step 2: Filter patients with >= MIN_READINGS_FOR_ACTIVE readings
    const activePatients = Object.entries(patientReadings)
      .filter(([pid, readings]) => readings.length >= MIN_READINGS_FOR_ACTIVE);
    
    // Step 3: Get all readings from active patients only
    const activeReadings = activePatients.flatMap(([pid, readings]) => readings);
    
    // Step 4: Bucket readings into Time in Range categories
    const buckets = {
      veryLow: 0,    // <54 mg/dL
      low: 0,        // 54-69 mg/dL
      target: 0,     // 70-180 mg/dL (Time in Range)
      high: 0,       // 181-250 mg/dL
      veryHigh: 0    // >250 mg/dL
    };

    activeReadings.forEach(reading => {
      const value = reading.value;
      if (value < GLUCOSE_RANGES.VERY_LOW_MAX) {
        buckets.veryLow++;
      } else if (value <= GLUCOSE_RANGES.LOW_MAX) {
        buckets.low++;
      } else if (value >= GLUCOSE_RANGES.TARGET_MIN && value <= GLUCOSE_RANGES.TARGET_MAX) {
        buckets.target++;
      } else if (value <= GLUCOSE_RANGES.HIGH_MAX) {
        buckets.high++;
      } else {
        buckets.veryHigh++;
      }
    });

    // Step 5: Calculate percentages
    const totalReadings = activeReadings.length;
    
    return {
      veryLow: totalReadings > 0 ? Math.round((buckets.veryLow / totalReadings) * 100) : 0,
      low: totalReadings > 0 ? Math.round((buckets.low / totalReadings) * 100) : 0,
      target: totalReadings > 0 ? Math.round((buckets.target / totalReadings) * 100) : 0,
      high: totalReadings > 0 ? Math.round((buckets.high / totalReadings) * 100) : 0,
      veryHigh: totalReadings > 0 ? Math.round((buckets.veryHigh / totalReadings) * 100) : 0,
      activePatientCount: activePatients.length,
      totalReadings
    };
  }

  /**
   * Process GMI data - filter active patients and calculate averages
   */
  private processGMIData(readings: GMIReading[]): GMIResult {
    // Step 1: Group readings by patient ID
    const patientReadings = this.groupGMIReadingsByPatient(readings);
    
    // Step 2: Filter patients with >= MIN_READINGS_FOR_ACTIVE readings
    const activePatients = Object.entries(patientReadings)
      .filter(([pid, readings]) => readings.length >= MIN_READINGS_FOR_ACTIVE);
    
    // Step 3: Get all readings from active patients only
    const activeReadings = activePatients.flatMap(([pid, readings]) => readings);
    
    // Step 4: Bucket readings into GMI categories
    const buckets = {
      target: 0,    // ≤7.0%
      above: 0,     // 7.0-8.0%
      high: 0       // >8.0%
    };

    activeReadings.forEach(reading => {
      const value = reading.value;
      if (value <= GMI_RANGES.TARGET_MAX) {
        buckets.target++;
      } else if (value <= GMI_RANGES.ABOVE_MAX) {
        buckets.above++;
      } else {
        buckets.high++;
      }
    });

    // Step 5: Calculate percentages and average
    const totalReadings = activeReadings.length;
    const averageGMI = totalReadings > 0 
      ? Math.round((activeReadings.reduce((sum, reading) => sum + reading.value, 0) / totalReadings) * 10) / 10
      : 0;

    return {
      target: totalReadings > 0 ? Math.round((buckets.target / totalReadings) * 100) : 0,
      above: totalReadings > 0 ? Math.round((buckets.above / totalReadings) * 100) : 0,
      high: totalReadings > 0 ? Math.round((buckets.high / totalReadings) * 100) : 0,
      averageGMI,
      activePatientCount: activePatients.length,
      totalReadings
    };
  }

  /**
   * Generate dashboard metadata
   */
  private generateMetadata(period: TimePeriod, activePatientCount: number): DashboardMetadata {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - period);

    return {
      dateRange: {
        start: startDate.toLocaleDateString(),
        end: endDate.toLocaleDateString()
      },
      lastUpdated: new Date().toLocaleString(),
      selectedPeriod: period
    };
  }

  /**
   * Helper method to group Time in Range readings by patient ID
   */
  private groupReadingsByPatient(readings: TimeInRangeReading[]): Record<string, TimeInRangeReading[]> {
    return readings.reduce((groups, reading) => {
      const pid = reading.pid;
      if (!groups[pid]) {
        groups[pid] = [];
      }
      groups[pid].push(reading);
      return groups;
    }, {} as Record<string, TimeInRangeReading[]>);
  }

  /**
   * Helper method to group GMI readings by patient ID
   */
  private groupGMIReadingsByPatient(readings: GMIReading[]): Record<string, GMIReading[]> {
    return readings.reduce((groups, reading) => {
      const pid = reading.pid;
      if (!groups[pid]) {
        groups[pid] = [];
      }
      groups[pid].push(reading);
      return groups;
    }, {} as Record<string, GMIReading[]>);
  }
}