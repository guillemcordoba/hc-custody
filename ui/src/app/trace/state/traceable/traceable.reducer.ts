import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { TraceableActions, TraceableActionTypes } from './traceable.actions';
import { Traceable } from '../trace.model';

export interface TraceableState extends EntityState<Traceable> {
  // additional entities state properties
  selectedTraceable: string;
  loadingList: boolean;
  loadingDetail: boolean;
}

export const adapter: EntityAdapter<Traceable> = createEntityAdapter<
  Traceable
>();

export const initialState: TraceableState = adapter.getInitialState({
  // additional entity state properties
  selectedTraceable: null,
  loadingList: false,
  loadingDetail: false
});

export function reducer(
  state = initialState,
  action: TraceableActions
): TraceableState {
  switch (action.type) {
    case TraceableActionTypes.AddTraceable: {
      return adapter.addOne(action.payload.traceable, state);
    }

    case TraceableActionTypes.UpsertTraceable: {
      return adapter.upsertOne(action.payload.traceable, state);
    }

    case TraceableActionTypes.AddTraceables: {
      return adapter.addMany(action.payload.traceables, state);
    }

    case TraceableActionTypes.UpsertTraceables: {
      return adapter.upsertMany(action.payload.traceables, state);
    }

    case TraceableActionTypes.UpdateTraceable: {
      return adapter.updateOne(action.payload.traceable, state);
    }

    case TraceableActionTypes.UpdateTraceables: {
      return adapter.updateMany(action.payload.traceables, state);
    }

    case TraceableActionTypes.DeleteTraceable: {
      return adapter.removeOne(action.payload.id, state);
    }

    case TraceableActionTypes.DeleteTraceables: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case TraceableActionTypes.LoadTraceablesSuccess: {
      return adapter.addAll(action.payload.traceables, state);
    }

    case TraceableActionTypes.ClearTraceables: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}
