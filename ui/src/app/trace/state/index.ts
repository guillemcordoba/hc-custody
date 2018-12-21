import { ActionReducerMap } from '@ngrx/store';
import * as fromTraceable from './traceable/traceable.reducer';
import * as fromTransfer from './transfer/transfer.reducer';

export interface TraceState {
  traceable: fromTraceable.TraceableState;
  transfer: fromTransfer.TransferState;
}

export const reducers: ActionReducerMap<TraceState> = {
  traceable: fromTraceable.reducer,
  transfer: fromTransfer.reducer
};
