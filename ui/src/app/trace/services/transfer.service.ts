import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Transfer, TransferState } from '../state/trace.model';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  constructor() {}

  public loadTransfers(traceableId: string): Observable<Transfer[]> {
    return of([
      {
        id: 'transfer1',
        sender: 'myonelove',
        receiver: 'myotherlove',
        state: TransferState.COMPLETED,
        timestamp: Date.now(),
        traceableId: 'miyd',
        observations: 'yeah object is fine'
      },
      {
        id: 'transfer2',
        sender: 'myonelove',
        receiver: 'myotherlove',
        state: TransferState.COMPLETED,
        timestamp: Date.now(),
        traceableId: 'miyd',
        observations: 'yeah object is fine'
      },
      {
        id: 'transfer3',
        sender: 'myonelove',
        receiver: 'myotherlove',
        state: TransferState.COMPLETED,
        timestamp: Date.now(),
        traceableId: 'miyd',
        observations: 'yeah object is fine'
      },
      {
        id: 'transfer4',
        sender: 'myonelove',
        receiver: 'myotherlove',
        state: TransferState.COMPLETED,
        timestamp: Date.now(),
        traceableId: 'miyd',
        observations: 'yeah object is fine'
      }
    ]);
  }
}
