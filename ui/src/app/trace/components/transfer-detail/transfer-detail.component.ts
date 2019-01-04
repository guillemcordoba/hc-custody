import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output
} from '@angular/core';
import { Transfer, TransferState } from '../../state/trace.model';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'ht-transfer-detail',
  templateUrl: './transfer-detail.component.html',
  styleUrls: ['./transfer-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransferDetailComponent implements OnInit {
  TransferState = TransferState;

  @Input()
  transfer: Transfer;

  @Output()
  rejectTransfer = new EventEmitter<void>();

  @Output()
  modifyTransfer = new EventEmitter<void>();

  @Output()
  acceptTransfer = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}
}
