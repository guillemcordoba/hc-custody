import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  TransferActionTypes,
  LoadTransfersSuccess,
  LoadTransfers
} from './transfer.actions';
import { switchMap, map } from 'rxjs/operators';
import { TransferService } from '../../services/transfer.service';

@Injectable()
export class TransferEffects {
  @Effect()
  loadTransfers$ = this.actions$.pipe(
    ofType(TransferActionTypes.LoadTransfers),
    switchMap((action: LoadTransfers) =>
      this.transferService.loadTransfers(action.payload.traceableId)
    ),
    map(transfers => new LoadTransfersSuccess({ transfers }))
  );

  constructor(
    private actions$: Actions,
    private transferService: TransferService
  ) {}
}
