import { Component, OnInit, Input } from '@angular/core';
import { Traceable, Transfer } from '../../state/trace.model';

@Component({
  selector: 'ht-traceable-detail',
  templateUrl: './traceable-detail.component.html',
  styleUrls: ['./traceable-detail.component.css']
})
export class TraceableDetailComponent implements OnInit {
  @Input()
  traceable: Traceable;

  @Input()
  transfers: Transfer[];

  constructor() {}

  ngOnInit() {}
}
