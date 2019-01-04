import { createSelector } from '@ngrx/store';
import { selectTransfers } from '..';
import { adapter } from './transfer.reducer';

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors(selectTransfers);

export const selectByTraceableId = (traceableId: string) =>
  createSelector(
    selectAll,
    transfers =>
      transfers.filter(transfer => transfer.traceableId === traceableId)
  );

export const selectById = id =>
  createSelector(
    selectTransfers,
    state => state.entities[id]
  );
