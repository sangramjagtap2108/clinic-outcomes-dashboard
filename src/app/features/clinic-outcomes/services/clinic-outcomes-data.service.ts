import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { 
  TimeInRangeResult, 
  GMIResult, 
  DashboardMetadata, 
  TimePeriod
} from '../models';
import { ApiResponse } from '../../../shared/models';

// Separate API response interfaces for each endpoint
interface TimeInRangeApiData {
  patientCount: number;
  period: number;
  dataGeneratedDate: string;
  timeInRange: {
    veryLow: number;
    low: number;
    target: number;
    high: number;
    veryHigh: number;
  };
}

interface GMIApiData {
  patientCount: number;
  period: number;
  dataGeneratedDate: string;
  gmi: {
    averageGMI: number;
    target: number;
    above: number;
    high: number;
  };
}

type TimeInRangeApiResponse = ApiResponse<TimeInRangeApiData>;
type GMIApiResponse = ApiResponse<GMIApiData>;

@Injectable({
  providedIn: 'root'
})
export class ClinicOutcomesDataService {

  private readonly apiBaseUrl = '/api/clinic-outcomes';

  constructor(private http: HttpClient) {}

  /**
   * Get Time in Range data for specific period
   */
  getTimeInRangeData(period: TimePeriod): Observable<TimeInRangeResult> {
    return this.http.get<TimeInRangeApiResponse>(
      `${this.apiBaseUrl}/time-in-range?period=${period}`
    ).pipe(
      map(response => {
        const apiData = response.data;
        return {
          veryLow: apiData.timeInRange.veryLow,
          low: apiData.timeInRange.low,
          target: apiData.timeInRange.target,
          high: apiData.timeInRange.high,
          veryHigh: apiData.timeInRange.veryHigh,
          activePatientCount: apiData.patientCount,
          totalReadings: 0 // Not needed for current UI
        };
      })
    );
  }

  /**
   * Get GMI data for specific period
   */
  getGMIData(period: TimePeriod): Observable<GMIResult> {
    return this.http.get<GMIApiResponse>(
      `${this.apiBaseUrl}/gmi?period=${period}`
    ).pipe(
      map(response => {
        const apiData = response.data;
        return {
          target: apiData.gmi.target,
          above: apiData.gmi.above,
          high: apiData.gmi.high,
          averageGMI: apiData.gmi.averageGMI,
          activePatientCount: apiData.patientCount,
          totalReadings: 0 // Not needed for current UI
        };
      })
    );
  }

  /**
   * Get metadata for specific period
   */
  getMetadata(period: TimePeriod): Observable<DashboardMetadata> {
    return new Observable(observer => {
      observer.next({
        dateRange: {
          start: this.formatDateForPeriod(period),
          end: new Date().toLocaleDateString()
        },
        lastUpdated: new Date().toLocaleString(),
        selectedPeriod: period
      });
      observer.complete();
    });
  }

  /**
   * Legacy method - kept for backward compatibility during transition
   * @deprecated Use getTimeInRangeData(), getGMIData(), and getMetadata() instead
   */
  /**
   * Legacy method - kept for backward compatibility during transition
   * @deprecated Use getTimeInRangeData(), getGMIData(), and getMetadata() instead
   */
  getDashboardData(period: TimePeriod): Observable<{
    timeInRangeResult: TimeInRangeResult;
    gmiResult: GMIResult;
    metadata: DashboardMetadata;
  }> {
    // This method will be removed after migration to separate calls
    // For now, we'll use the new separate methods internally
    return new Observable(observer => {
      // Note: This is temporary - will be removed once NgRx is updated
      observer.error(new Error('getDashboardData is deprecated. Use separate methods.'));
    });
  }

  /**
   * Helper method to format date for the given period
   */
  private formatDateForPeriod(period: TimePeriod): string {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - period);
    return startDate.toLocaleDateString();
  }
}