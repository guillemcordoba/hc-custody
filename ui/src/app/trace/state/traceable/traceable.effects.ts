import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  TraceableActionTypes,
  LoadTraceablesSuccess
} from './traceable.actions';
import { switchMap, map } from 'rxjs/operators';
import { TraceableService } from '../../services/traceable.service';

@Injectable()
export class TraceableEffects {
  @Effect()
  loadTraceables$ = this.actions$.pipe(
    ofType(TraceableActionTypes.LoadTraceables),
    switchMap(action => this.traceableService.loadTraceables()),
    map(traceables => new LoadTraceablesSuccess({ traceables }))
  );

  constructor(
    private actions$: Actions,
    private traceableService: TraceableService
  ) {}
}
