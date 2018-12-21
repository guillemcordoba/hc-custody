import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Traceable, Transfer } from '../../state/trace.model';
import * as fromTraceable from '../../state/traceable/traceable.reducer';
import * as fromTransfer from '../../state/transfer/transfer.reducer';
import { LoadTraceables } from '../../state/traceable/traceable.actions';
import { LoadTransfers } from '../../state/transfer/transfer.actions';
import { TraceState } from '../../state';
import { tap } from 'rxjs/operators';

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

  constructor(private store: Store<TraceState>) {}

  ngOnInit() {
    this.store.dispatch(new LoadTraceables({ type: 'holding' }));
    this.traceables$ = this.store.pipe(
      select(fromTraceable.selectTraceables),
      select(fromTraceable.selectAll)
    );
  }

  traceableSelected(id: string) {
    this.store.dispatch(new LoadTraceables({ ids: [id] }));
    this.selectedTraceable$ = this.store.pipe(
      select(fromTraceable.selectTraceables),
      select(fromTraceable.selectById(id))
    );
    this.store.dispatch(new LoadTransfers({ traceableId: id }));
    this.selectedTraceableTransfers$ = this.store.pipe(
      tap(console.log),
      select(state => state.traceable.transfer),
      select(fromTransfer.selectByTraceableId(id))
    );
  }
}
