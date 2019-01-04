import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { Transfer } from '../../state/trace.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ht-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransferFormComponent implements OnInit {
  @Input()
  transfer: Transfer;

  @Output()
  saveTransfer = new EventEmitter<Partial<Transfer>>();

  @Output()
  discardChanges = new EventEmitter<void>();

  transferForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.transferForm = this.formBuilder.group({
      receiver: [this.transfer.receiver, Validators.required],
      observations: this.transfer.observations
    });
  }

  saveForm() {
    this.saveTransfer.emit(this.transferForm.value);
  }
}
