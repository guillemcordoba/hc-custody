import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TraceableEffects } from './state/traceable/traceable.effects';
import { TransferEffects } from './state/transfer/transfer.effects';
import * as fromTrace from './state';
import { TraceableListComponent } from './components/traceable-list/traceable-list.component';
import { MatListModule, MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { TraceablesComponent } from './containers/traceables/traceables.component';
import { TraceableDetailComponent } from './components/traceable-detail/traceable-detail.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TransferComponent } from './containers/transfer/transfer.component';
import { TransferDetailComponent } from './components/transfer-detail/transfer-detail.component';
import { TransferFormComponent } from './components/transfer-form/transfer-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TraceableListComponent,
    TraceablesComponent,
    TraceableDetailComponent,
    TransferComponent,
    TransferDetailComponent,
    TransferFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    FlexLayoutModule,
    StoreModule.forFeature('trace', fromTrace.reducers),
    EffectsModule.forFeature([TraceableEffects, TransferEffects])
  ],
  exports: [TraceableListComponent, TraceableDetailComponent, TransferComponent, TransferDetailComponent, TransferFormComponent]
})
export class TraceModule {}
