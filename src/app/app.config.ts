import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { clinicOutcomesReducer } from './features/clinic-outcomes/store/reducer';
import { ClinicOutcomesEffects } from './features/clinic-outcomes/store/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    
    // NgRx Configuration
    provideStore({
      clinicOutcomes: clinicOutcomesReducer
    }),
    provideEffects([ClinicOutcomesEffects]),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: false, // Enable DevTools in production
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    })
  ]
};
