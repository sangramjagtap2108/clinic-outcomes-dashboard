import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { 
  TimeInRangeResult, 
  GMIResult, 
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
}