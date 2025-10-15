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
import { DashboardApiResponse } from '../../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class ClinicOutcomesDataService {

  private readonly apiBaseUrl = '/api/clinic-outcomes';

  constructor(private http: HttpClient) {}

  /**
   * Main method to get processed dashboard data via HTTP API
   */
  getDashboardData(period: TimePeriod): Observable<{
    timeInRangeResult: TimeInRangeResult;
    gmiResult: GMIResult;
    metadata: DashboardMetadata;
  }> {
    // Make HTTP call to dashboard API endpoint
    return this.http.get<DashboardApiResponse>(
      `${this.apiBaseUrl}/dashboard?period=${period}`
    ).pipe(
      map(response => {
        // Transform API response to component format
        const apiData = response.data;
        
        return {
          timeInRangeResult: {
            veryLow: apiData.timeInRange.veryLow,
            low: apiData.timeInRange.low,
            target: apiData.timeInRange.target,
            high: apiData.timeInRange.high,
            veryHigh: apiData.timeInRange.veryHigh,
            activePatientCount: apiData.patientCount,
            totalReadings: 0 // Not needed for current UI
          },
          gmiResult: {
            target: apiData.gmi.target,
            above: apiData.gmi.above,
            high: apiData.gmi.high,
            averageGMI: apiData.gmi.averageGMI,
            activePatientCount: apiData.patientCount,
            totalReadings: 0 // Not needed for current UI
          },
          metadata: {
            dateRange: {
              start: this.formatDateForPeriod(period),
              end: new Date().toLocaleDateString()
            },
            lastUpdated: new Date(response.timestamp).toLocaleString(),
            selectedPeriod: period
          }
        };
      })
    );
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