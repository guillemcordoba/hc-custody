import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Transfer } from '../trace.model';

export enum TransferActionTypes {
  LoadTransfers = '[Transfer] Load Transfers',
  LoadTransfersSuccess = '[Transfer] Load Transfers Success',
  CreateTransfer = '[Transfer] Create New Transfer',
  RejectTransfer = '[Transfer] Reject Transfer',
  AcceptTransfer = '[Transfer] Accept Transfer',

  AddTransfer = '[Transfer] Add Transfer',
  UpsertTransfer = '[Transfer] Upsert Transfer',
  AddTransfers = '[Transfer] Add Transfers',
  UpsertTransfers = '[Transfer] Upsert Transfers',
  UpdateTransfer = '[Transfer] Update Transfer',
  UpdateTransfers = '[Transfer] Update Transfers',
  DeleteTransfer = '[Transfer] Delete Transfer',
  DeleteTransfers = '[Transfer] Delete Transfers',
  ClearTransfers = '[Transfer] Clear Transfers'
}

export class LoadTransfers implements Action {
  readonly type = TransferActionTypes.LoadTransfers;

  constructor(public payload: { traceableId: string }) {}
}

export class LoadTransfersSuccess implements Action {
  readonly type = TransferActionTypes.LoadTransfersSuccess;

  constructor(public payload: { transfers: Transfer[] }) {}
}

export class CreateTransfer implements Action {
  readonly type = TransferActionTypes.CreateTransfer;

  constructor(public payload: { transfer: Transfer }) {}
}

export class RejectTransfer implements Action {
  readonly type = TransferActionTypes.RejectTransfer;

  constructor(public payload: { transferId: string }) {}
}

export class AcceptTransfer implements Action {
  readonly type = TransferActionTypes.AcceptTransfer;

  constructor(public payload: { transferId: string }) {}
}

export class AddTransfer implements Action {
  readonly type = TransferActionTypes.AddTransfer;

  constructor(public payload: { transfer: Transfer }) {}
}

export class UpsertTransfer implements Action {
  readonly type = TransferActionTypes.UpsertTransfer;

  constructor(public payload: { transfer: Transfer }) {}
}

export class AddTransfers implements Action {
  readonly type = TransferActionTypes.AddTransfers;

  constructor(public payload: { transfers: Transfer[] }) {}
}

export class UpsertTransfers implements Action {
  readonly type = TransferActionTypes.UpsertTransfers;

  constructor(public payload: { transfers: Transfer[] }) {}
}

export class UpdateTransfer implements Action {
  readonly type = TransferActionTypes.UpdateTransfer;

  constructor(public payload: { transfer: Update<Transfer> }) {}
}

export class UpdateTransfers implements Action {
  readonly type = TransferActionTypes.UpdateTransfers;

  constructor(public payload: { transfers: Update<Transfer>[] }) {}
}

export class DeleteTransfer implements Action {
  readonly type = TransferActionTypes.DeleteTransfer;

  constructor(public payload: { id: string }) {}
}

export class DeleteTransfers implements Action {
  readonly type = TransferActionTypes.DeleteTransfers;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearTransfers implements Action {
  readonly type = TransferActionTypes.ClearTransfers;
}

export type TransferActions =
  | LoadTransfers
  | LoadTransfersSuccess
  | CreateTransfer
  | AcceptTransfer
  | RejectTransfer
  | AddTransfer
  | UpsertTransfer
  | AddTransfers
  | UpsertTransfers
  | UpdateTransfer
  | UpdateTransfers
  | DeleteTransfer
  | DeleteTransfers
  | ClearTransfers;
