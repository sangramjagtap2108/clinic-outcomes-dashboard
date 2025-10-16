import { Component, OnInit, OnDestroy, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { 
  selectGMIResult, 
  selectGMILoading, 
  selectGMIError
} from '../../store/selectors';
import { GMIResult } from '../../models';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-gmi-chart',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent],
  templateUrl: './gmi-chart.component.html',
  styleUrls: ['./gmi-chart.component.scss']
})
export class GMIChartComponent implements OnInit, AfterViewInit, OnDestroy {
  private store = inject(Store);
  private destroy$ = new Subject<void>();
  private gmiChart: Chart | null = null;

  constructor() {
    // Register Chart.js components - no platform check needed for SPA
    Chart.register(...registerables);
  }

  // NgRx Observables
  gmiData$: Observable<GMIResult | null> = this.store.select(selectGMIResult);
  loading$: Observable<boolean> = this.store.select(selectGMILoading);
  error$: Observable<string | null> = this.store.select(selectGMIError);

  ngOnInit() {
    // Subscribe to GMI data changes
    this.gmiData$
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        if (data) {
          this.updateChart(data);
        }
      });
  }

  ngAfterViewInit() {
    // Chart creation will be handled by ngOnInit subscription after view is ready
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    
    if (this.gmiChart) {
      this.gmiChart.destroy();
    }
  }

  private createChart(data: GMIResult) {
    const canvas = document.getElementById('gmiChart') as HTMLCanvasElement;
    if (!canvas) return;

    // Destroy existing chart if it exists
    if (this.gmiChart) {
      this.gmiChart.destroy();
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Prepare data - only include categories with values > 0
    const chartData = [];
    const chartLabels = [];
    const chartColors = [];

    if (data.target > 0) {
      chartData.push(data.target);
      chartLabels.push('Target');
      chartColors.push('#8bc34a');
    }
    if (data.above > 0) {
      chartData.push(data.above);
      chartLabels.push('Above Target');
      chartColors.push('#ff9800');
    }
    if (data.high > 0) {
      chartData.push(data.high);
      chartLabels.push('High');
      chartColors.push('#f44336');
    }

    this.gmiChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: chartLabels,
        datasets: [{
          data: chartData,
          backgroundColor: chartColors,
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        }
      }
    } as ChartConfiguration);
  }

  private updateChart(data: GMIResult) {
    // Use setTimeout to ensure DOM is ready, especially on first load
    setTimeout(() => this.createChart(data), 0);
  }
}