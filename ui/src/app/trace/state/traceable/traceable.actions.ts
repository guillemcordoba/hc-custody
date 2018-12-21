import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Traceable } from '../trace.model';

export enum TraceableActionTypes {
  LoadTraceables = '[Traceable] Load Traceables',
  LoadTraceablesSuccess = '[Traceable] Load Traceables Success',
  AddTraceable = '[Traceable] Add Traceable',
  UpsertTraceable = '[Traceable] Upsert Traceable',
  AddTraceables = '[Traceable] Add Traceables',
  UpsertTraceables = '[Traceable] Upsert Traceables',
  UpdateTraceable = '[Traceable] Update Traceable',
  UpdateTraceables = '[Traceable] Update Traceables',
  DeleteTraceable = '[Traceable] Delete Traceable',
  DeleteTraceables = '[Traceable] Delete Traceables',
  ClearTraceables = '[Traceable] Clear Traceables'
}

export class LoadTraceables implements Action {
  readonly type = TraceableActionTypes.LoadTraceables;

  constructor(public payload: { type?: string, ids?: string[] }) {}
}

export class LoadTraceablesSuccess implements Action {
  readonly type = TraceableActionTypes.LoadTraceablesSuccess;

  constructor(public payload: { traceables: Traceable[] }) {}
}

export class AddTraceable implements Action {
  readonly type = TraceableActionTypes.AddTraceable;

  constructor(public payload: { traceable: Traceable }) {}
}

export class UpsertTraceable implements Action {
  readonly type = TraceableActionTypes.UpsertTraceable;

  constructor(public payload: { traceable: Traceable }) {}
}

export class AddTraceables implements Action {
  readonly type = TraceableActionTypes.AddTraceables;

  constructor(public payload: { traceables: Traceable[] }) {}
}

export class UpsertTraceables implements Action {
  readonly type = TraceableActionTypes.UpsertTraceables;

  constructor(public payload: { traceables: Traceable[] }) {}
}

export class UpdateTraceable implements Action {
  readonly type = TraceableActionTypes.UpdateTraceable;

  constructor(public payload: { traceable: Update<Traceable> }) {}
}

export class UpdateTraceables implements Action {
  readonly type = TraceableActionTypes.UpdateTraceables;

  constructor(public payload: { traceables: Update<Traceable>[] }) {}
}

export class DeleteTraceable implements Action {
  readonly type = TraceableActionTypes.DeleteTraceable;

  constructor(public payload: { id: string }) {}
}

export class DeleteTraceables implements Action {
  readonly type = TraceableActionTypes.DeleteTraceables;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearTraceables implements Action {
  readonly type = TraceableActionTypes.ClearTraceables;
}

export type TraceableActions =
  | LoadTraceables
  | LoadTraceablesSuccess
  | AddTraceable
  | UpsertTraceable
  | AddTraceables
  | UpsertTraceables
  | UpdateTraceable
  | UpdateTraceables
  | DeleteTraceable
  | DeleteTraceables
  | ClearTraceables;
