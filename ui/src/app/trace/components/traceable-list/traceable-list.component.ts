import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Traceable } from '../../state/trace.model';

@Component({
  selector: 'ht-traceable-list',
  templateUrl: './traceable-list.component.html',
  styleUrls: ['./traceable-list.component.css']
})
export class TraceableListComponent implements OnInit {
  @Input()
  traceables: Traceable[];

  @Output()
  traceableSelected = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}
}
