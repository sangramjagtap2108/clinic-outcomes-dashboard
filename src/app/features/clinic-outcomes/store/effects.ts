import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import * as ClinicOutcomesActions from './actions';
import { ClinicOutcomesDataService } from '../services/clinic-outcomes-data.service';

@Injectable()
export class ClinicOutcomesEffects {
  private actions$ = inject(Actions);
  private dataService = inject(ClinicOutcomesDataService);
  
  // Load Dashboard Data Effect
  loadDashboardData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClinicOutcomesActions.loadDashboardData),
      switchMap(({ period }) =>
        this.dataService.getDashboardData(period).pipe(
          map(data => ClinicOutcomesActions.loadDashboardDataSuccess(data)),
          catchError(error => of(ClinicOutcomesActions.loadDashboardDataFailure({ 
            error: error.message || 'Failed to load dashboard data' 
          })))
        )
      )
    )
  );
}