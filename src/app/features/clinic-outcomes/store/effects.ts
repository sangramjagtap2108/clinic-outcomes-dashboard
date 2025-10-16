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
  
  // Time in Range Data Effect
  loadTimeInRangeData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClinicOutcomesActions.loadTimeInRangeData),
      switchMap(({ period }) =>
        this.dataService.getTimeInRangeData(period).pipe(
          map(timeInRangeResult => ClinicOutcomesActions.loadTimeInRangeDataSuccess({ timeInRangeResult })),
          catchError(error => of(ClinicOutcomesActions.loadTimeInRangeDataFailure({ 
            error: error.message || 'Failed to load Time in Range data' 
          })))
        )
      )
    )
  );

  // GMI Data Effect
  loadGMIData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClinicOutcomesActions.loadGMIData),
      switchMap(({ period }) =>
        this.dataService.getGMIData(period).pipe(
          map(gmiResult => ClinicOutcomesActions.loadGMIDataSuccess({ gmiResult })),
          catchError(error => of(ClinicOutcomesActions.loadGMIDataFailure({ 
            error: error.message || 'Failed to load GMI data' 
          })))
        )
      )
    )
  );


}