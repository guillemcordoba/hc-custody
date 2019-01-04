import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
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

export const selectTrace = createFeatureSelector<TraceState>('trace');

export const selectTraceables = createSelector(
  selectTrace,
  state => state.traceable
);

export const selectTransfers = createSelector(
  selectTrace,
  state => state.transfer
);
