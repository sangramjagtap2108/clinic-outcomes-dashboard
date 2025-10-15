import { Component, OnInit, OnDestroy, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Chart, registerables } from 'chart.js';

import { 
  selectDashboardData, 
  selectSelectedPeriod,
  selectLoading 
} from '../store/selectors';
import { loadDashboardData, selectTimePeriod } from '../store/actions';
import { TimePeriod } from '../models';

@Component({
  selector: 'app-clinic-outcomes-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clinic-outcomes-dashboard.component.html',
  styleUrl: './clinic-outcomes-dashboard.component.scss'
})
export class ClinicOutcomesDashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private timeInRangeChart: Chart | null = null;
  private gmiChart: Chart | null = null;
  
  dashboardData$: Observable<any>;
  selectedPeriod$: Observable<TimePeriod>;
  loading$: Observable<boolean>;
  
  timePeriods: TimePeriod[] = [30, 60, 90];

  constructor(private store: Store, @Inject(PLATFORM_ID) private platformId: Object) {
    // Register Chart.js components only in browser
    if (isPlatformBrowser(this.platformId)) {
      Chart.register(...registerables);
    }
    
    this.dashboardData$ = this.store.select(selectDashboardData);
    this.selectedPeriod$ = this.store.select(selectSelectedPeriod);
    this.loading$ = this.store.select(selectLoading);
  }

  ngOnInit() {
    // Load initial data for 30 days
    this.store.dispatch(loadDashboardData({ period: 30 }));
  }

  ngAfterViewInit() {
    // Only run in browser environment
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    
    // Subscribe to data changes and create chart when data is available
    this.dashboardData$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      if (data?.timeInRange) {
        setTimeout(() => {
          const canvas = document.getElementById('timeInRangeChart') as HTMLCanvasElement;
          if (canvas) {
            this.createTimeInRangeChart(canvas, data.timeInRange);
          }
        }, 100);
      }
      
      if (data?.gmi) {
        setTimeout(() => {
          const canvas = document.getElementById('gmiChart') as HTMLCanvasElement;
          if (canvas) {
            this.createGMIChart(canvas, data.gmi);
          }
        }, 100);
      }
    });
  }

  ngOnDestroy() {
    // Clean up charts
    if (this.timeInRangeChart) {
      this.timeInRangeChart.destroy();
    }
    
    if (this.gmiChart) {
      this.gmiChart.destroy();
    }
    
    this.destroy$.next();
    this.destroy$.complete();
  }

  private createTimeInRangeChart(canvas: HTMLCanvasElement, data: any) {
    // Destroy existing chart if it exists
    if (this.timeInRangeChart) {
      this.timeInRangeChart.destroy();
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    this.timeInRangeChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Time in Range'],
        datasets: [
          {
            label: 'Very Low (<54)',
            data: [data.veryLow],
            backgroundColor: '#dc3545',
            borderWidth: 0,
            barPercentage: 0.3, // Make bar narrower
            categoryPercentage: 0.8
          },
          {
            label: 'Low (54-69)',
            data: [data.low],
            backgroundColor: '#fd7e14',
            borderWidth: 0,
            barPercentage: 0.3,
            categoryPercentage: 0.8
          },
          {
            label: 'Target (70-180)',
            data: [data.target],
            backgroundColor: '#28a745',
            borderWidth: 0,
            barPercentage: 0.3,
            categoryPercentage: 0.8
          },
          {
            label: 'High (181-250)',
            data: [data.high],
            backgroundColor: '#ffc107',
            borderWidth: 0,
            barPercentage: 0.3,
            categoryPercentage: 0.8
          },
          {
            label: 'Very High (>250)',
            data: [data.veryHigh],
            backgroundColor: '#dc3545',
            borderWidth: 0,
            barPercentage: 0.3,
            categoryPercentage: 0.8
          }
        ]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        interaction: {
          intersect: true,
          mode: 'dataset'
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: true,
            displayColors: false,
            callbacks: {
              title: function() {
                return '';
              },
              label: function(context) {
                return context.dataset.label + ': ' + context.parsed.y + '%';
              }
            }
          }
        },
        scales: {
          x: {
            stacked: true,
            display: false
          },
          y: {
            stacked: true,
            display: false
          }
        }
      }
    });
  }

  private createGMIChart(canvas: HTMLCanvasElement, data: any) {
    // Destroy existing chart if it exists
    if (this.gmiChart) {
      this.gmiChart.destroy();
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Define GMI colors matching clinical ranges
    const colors = [
      '#28a745', // Target (≤7.0%) - Green
      '#ffc107', // Above Target (7.0-8.0%) - Yellow
      '#dc3545'  // High (>8.0%) - Red
    ];

    // Prepare data - only include categories with values > 0
    const chartData = [];
    const chartLabels = [];
    const chartColors = [];

    if (data.target > 0) {
      chartData.push(data.target);
      chartLabels.push('Target');
      chartColors.push('#28a745');
    }
    if (data.above > 0) {
      chartData.push(data.above);
      chartLabels.push('Above Target');
      chartColors.push('#ffc107');
    }
    if (data.high > 0) {
      chartData.push(data.high);
      chartLabels.push('High');
      chartColors.push('#dc3545');
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
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              padding: 20,
              usePointStyle: true,
              pointStyle: 'circle',
              font: {
                size: 12
              },
              generateLabels: function(chart) {
                const data = chart.data;
                if (data.labels && data.datasets.length) {
                  return data.labels.map((label, i) => {
                    const dataset = data.datasets[0];
                    const value = dataset.data[i];
                    const backgroundColor = Array.isArray(dataset.backgroundColor) 
                      ? dataset.backgroundColor[i] 
                      : dataset.backgroundColor;
                    
                    return {
                      text: `${label} (${value}%)`,
                      fillStyle: backgroundColor as string,
                      strokeStyle: backgroundColor as string,
                      pointStyle: 'circle',
                      hidden: false
                    };
                  });
                }
                return [];
              }
            }
          },
          tooltip: {
            enabled: true,
            displayColors: false,
            callbacks: {
              title: function() {
                return '';
              },
              label: function(context) {
                return context.label + ': ' + context.parsed + '%';
              }
            }
          }
        }
      }
    });
  }

  onPeriodSelect(period: TimePeriod) {
    this.store.dispatch(selectTimePeriod({ period }));
    this.store.dispatch(loadDashboardData({ period }));
  }

  onPrintClick() {
    // TODO: Implement print functionality later
    console.log('Print clicked - functionality to be implemented');
  }
}