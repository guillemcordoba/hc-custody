import { Component, OnInit, Input } from '@angular/core';
import { TraceState } from '../../state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Transfer, TransferState } from '../../state/trace.model';
import * as fromTransfer from '../../state/transfer/transfer.selectors';
import {
  CreateTransfer,
  UpdateTransfer,
  AcceptTransfer,
  RejectTransfer
} from '../../state/transfer/transfer.actions';

@Component({
  selector: 'ht-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  @Input()
  transferId: string;
  @Input()
  traceableId: string;

  @Input()
  editingMode = false;
  transfer$: Observable<Transfer>;

  constructor(private store: Store<TraceState>) {}

  ngOnInit() {
    this.store.select(fromTransfer.selectById(this.transferId));
  }

  buildNewTransfer(): Transfer {
    return {
      id: null,
      sender: 'its me',
      receiver: null,
      state: null,
      observations: null,
      traceableId: this.traceableId
    };
  }

  toggleEditing() {
    this.editingMode = !this.editingMode;
  }

  createTransfer(transferData: Partial<Transfer>) {
    this.store.dispatch(
      new CreateTransfer({
        transfer: {
          id: null,
          sender: 'itsme',
          traceableId: this.traceableId,
          state: TransferState.AWAITING_CONFIRMATION,
          receiver: transferData.receiver,
          observations: transferData.observations
        }
      })
    );
  }

  updateTransfer(transferData: Partial<Transfer>) {
    this.store.dispatch(
      new UpdateTransfer({
        transfer: {
          id: this.transferId,
          changes: transferData
        }
      })
    );
  }

  acceptTransfer() {
    this.store.dispatch(new AcceptTransfer({ transferId: this.transferId }));
  }

  rejectTransfer() {
    this.store.dispatch(new RejectTransfer({ transferId: this.transferId }));
  }
}
