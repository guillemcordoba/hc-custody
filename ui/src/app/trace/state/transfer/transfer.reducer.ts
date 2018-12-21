import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { TransferActions, TransferActionTypes } from './transfer.actions';
import { Transfer } from '../trace.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface TransferState extends EntityState<Transfer> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Transfer> = createEntityAdapter<Transfer>();

export const initialState: TransferState = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state = initialState,
  action: TransferActions
): TransferState {
  switch (action.type) {
    case TransferActionTypes.LoadTransfersSuccess: {
      return adapter.addAll(action.payload.transfers, state);
    }

    case TransferActionTypes.AddTransfer: {
      return adapter.addOne(action.payload.transfer, state);
    }

    case TransferActionTypes.UpsertTransfer: {
      return adapter.upsertOne(action.payload.transfer, state);
    }

    case TransferActionTypes.AddTransfers: {
      return adapter.addMany(action.payload.transfers, state);
    }

    case TransferActionTypes.UpsertTransfers: {
      return adapter.upsertMany(action.payload.transfers, state);
    }

    case TransferActionTypes.UpdateTransfer: {
      return adapter.updateOne(action.payload.transfer, state);
    }

    case TransferActionTypes.UpdateTransfers: {
      return adapter.updateMany(action.payload.transfers, state);
    }

    case TransferActionTypes.DeleteTransfer: {
      return adapter.removeOne(action.payload.id, state);
    }

    case TransferActionTypes.DeleteTransfers: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case TransferActionTypes.ClearTransfers: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

// export const selectTransfers = createFeatureSelector<TransferState>('transfer');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

export const selectByTraceableId = (traceableId: string) =>
  createSelector(
    selectAll,
    transfers =>
      transfers.filter(transfer => transfer.traceableId === traceableId)
  );
