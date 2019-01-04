import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Traceable, Transfer } from '../../state/trace.model';
import * as fromTraceable from '../../state/traceable/traceable.selectors';
import * as fromTransfer from '../../state/transfer/transfer.selectors';
import { LoadTraceables } from '../../state/traceable/traceable.actions';
import { LoadTransfers } from '../../state/transfer/transfer.actions';
import { TraceState } from '../../state';

@Component({
  selector: 'ht-traceables',
  templateUrl: './traceables.component.html',
  styleUrls: ['./traceables.component.css']
})
export class TraceablesComponent implements OnInit {
  traceables$: Observable<Traceable[]>;

  // Detail
  selectedTraceable$: Observable<Traceable>;
  selectedTraceableTransfers$: Observable<Transfer[]>;

  // Transfer
  selectedTransferId: string;
  newTransfer = false;

  constructor(private store: Store<TraceState>) {}

  ngOnInit() {
    this.store.dispatch(new LoadTraceables({ type: 'holding' }));
    this.traceables$ = this.store.pipe(select(fromTraceable.selectAll));
  }

  traceableSelected(id: string) {
    this.store.dispatch(new LoadTraceables({ ids: [id] }));
    this.selectedTraceable$ = this.store.pipe(
      select(fromTraceable.selectById(id))
    );
    this.store.dispatch(new LoadTransfers({ traceableId: id }));
    this.selectedTraceableTransfers$ = this.store.pipe(
      select(fromTransfer.selectByTraceableId(id))
    );
  }

  initTransfer() {
    this.selectedTransferId = 'newTransfer';
    this.newTransfer = true;
  }
}
