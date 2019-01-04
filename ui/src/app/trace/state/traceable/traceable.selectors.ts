import { createSelector } from '@ngrx/store';
import { selectTraceables } from '..';
import { adapter } from './traceable.reducer';

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors(selectTraceables);

export const selectHoldingTraceables = createSelector(
  selectTraceables
  // (state: TraceableState) => state.ids.filter(id => state.entities[id].holder === MYADDRESS)
);

export const selectLoadingList = createSelector(
  selectTraceables,
  state => state.loadingList
);

export const selectLoadingDetail = createSelector(
  selectTraceables,
  state => state.loadingDetail
);

export const selectById = id =>
  createSelector(
    selectTraceables,
    state => state.entities[id]
  );
