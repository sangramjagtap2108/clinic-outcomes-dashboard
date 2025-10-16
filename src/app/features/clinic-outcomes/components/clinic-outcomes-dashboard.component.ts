import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

import { 
  selectDashboardData, 
  selectSelectedPeriod
} from '../store/selectors';
import { loadTimeInRangeData, loadGMIData } from '../store/actions';
import { TimePeriod } from '../models';
import { TimeInRangeChartComponent } from './time-in-range-chart/time-in-range-chart.component';
import { GMIChartComponent } from './gmi-chart/gmi-chart.component';

@Component({
  selector: 'app-clinic-outcomes-dashboard',
  standalone: true,
  imports: [CommonModule, TimeInRangeChartComponent, GMIChartComponent],
  templateUrl: './clinic-outcomes-dashboard.component.html',
  styleUrl: './clinic-outcomes-dashboard.component.scss'
})
export class ClinicOutcomesDashboardComponent implements OnInit {
  private store = inject(Store);
  
  dashboardData$ = this.store.select(selectDashboardData);
  selectedPeriod$ = this.store.select(selectSelectedPeriod);
  
  timePeriods: TimePeriod[] = [30, 60, 90];

  ngOnInit() {
    // Load initial data for 30 days using separate actions
    this.loadDataForPeriod(30);
  }

  private loadDataForPeriod(period: TimePeriod) {
    // Dispatch separate actions for each data type
    this.store.dispatch(loadTimeInRangeData({ period }));
    this.store.dispatch(loadGMIData({ period }));
  }

  onPeriodSelect(period: TimePeriod) {
    // Dispatch separate actions for each data type
    this.loadDataForPeriod(period);
  }

  onPrintClick() {
    // TODO: Implement print functionality later
    console.log('Print clicked - functionality to be implemented');
  }
}