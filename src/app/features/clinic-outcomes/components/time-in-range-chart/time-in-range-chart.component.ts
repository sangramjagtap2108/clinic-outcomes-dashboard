import { Component, OnInit, OnDestroy, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { 
  selectTimeInRangeResult, 
  selectTimeInRangeLoading, 
  selectTimeInRangeError
} from '../../store/selectors';
import { TimeInRangeResult } from '../../models';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-time-in-range-chart',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent],
  templateUrl: './time-in-range-chart.component.html',
  styleUrls: ['./time-in-range-chart.component.scss']
})
export class TimeInRangeChartComponent implements OnInit, AfterViewInit, OnDestroy {
  private store = inject(Store);
  private destroy$ = new Subject<void>();
  private timeInRangeChart: Chart | null = null;

  // Glucose range numbers for the strip
  public glucoseRangeNumbers: number[] = [40, 54, 70, 180, 240, 400];

  constructor() {
    // Register Chart.js components - no platform check needed for SPA
    Chart.register(...registerables);
  }

  // NgRx Observables
  timeInRangeData$: Observable<TimeInRangeResult | null> = this.store.select(selectTimeInRangeResult);
  loading$: Observable<boolean> = this.store.select(selectTimeInRangeLoading);
  error$: Observable<string | null> = this.store.select(selectTimeInRangeError);

  ngOnInit() {
    // Subscribe to time in range data changes
    this.timeInRangeData$
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
    
    if (this.timeInRangeChart) {
      this.timeInRangeChart.destroy();
    }
  }

  private createChart(data: TimeInRangeResult) {
    const canvas = document.getElementById('timeInRangeChart') as HTMLCanvasElement;
    if (!canvas) return;

    // Destroy existing chart if it exists
    if (this.timeInRangeChart) {
      this.timeInRangeChart.destroy();
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create stripe patterns
    const lowPattern = this.createStripePattern(ctx, '#dc3545', '#ffffff');
    const highPattern = this.createStripePattern(ctx, '#ffc107', '#ffffff');

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
            barPercentage: 0.3,
            categoryPercentage: 0.8
          },
          {
            label: 'Low (54-69)',
            data: [data.low],
            backgroundColor: lowPattern || '#dc3545',
            borderWidth: 0,
            barPercentage: 0.3,
            categoryPercentage: 0.8
          },
          {
            label: 'Target (70-180)',
            data: [data.target],
            backgroundColor: '#8bc34a',
            borderWidth: 0,
            barPercentage: 0.3,
            categoryPercentage: 0.8
          },
          {
            label: 'High (181-250)',
            data: [data.high],
            backgroundColor: highPattern || '#ffc107',
            borderWidth: 0,
            barPercentage: 0.3,
            categoryPercentage: 0.8
          },
          {
            label: 'Very High (>250)',
            data: [data.veryHigh],
            backgroundColor: '#ff6b35',
            borderWidth: 0,
            barPercentage: 0.3,
            categoryPercentage: 0.8
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: true,
            display: false
          },
          y: {
            stacked: true,
            display: false,
            max: 100
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        },
        animation: {
          duration: 1000,
          easing: 'easeInOutQuart'
        }
      }
    } as ChartConfiguration);
  }

  private updateChart(data: TimeInRangeResult) {
    // Use setTimeout to ensure DOM is ready, especially on first load
    setTimeout(() => this.createChart(data), 0);
  }

  private createStripePattern(ctx: CanvasRenderingContext2D, color1: string, color2: string): CanvasPattern | null {
    const patternCanvas = document.createElement('canvas');
    const patternCtx = patternCanvas.getContext('2d');
    
    if (!patternCtx) return null;
    
    patternCanvas.width = 8;
    patternCanvas.height = 8;
    
    patternCtx.fillStyle = color1;
    patternCtx.fillRect(0, 0, 8, 8);
    
    patternCtx.strokeStyle = color2;
    patternCtx.lineWidth = 1;
    patternCtx.beginPath();
    patternCtx.moveTo(0, 8);
    patternCtx.lineTo(8, 0);
    patternCtx.stroke();
    
    return ctx.createPattern(patternCanvas, 'repeat');
  }
}