import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TraceableEffects } from './state/traceable/traceable.effects';
import { TransferEffects } from './state/transfer/transfer.effects';
import * as fromTrace from './state';
import { TraceableListComponent } from './components/traceable-list/traceable-list.component';
import { MatListModule } from '@angular/material';
import { TraceablesComponent } from './containers/traceables/traceables.component';
import { TraceableDetailComponent } from './components/traceable-detail/traceable-detail.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    TraceableListComponent,
    TraceablesComponent,
    TraceableDetailComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    FlexLayoutModule,
    StoreModule.forFeature('traceable', fromTrace.reducers),
    EffectsModule.forFeature([TraceableEffects, TransferEffects])
  ],
  exports: [TraceableListComponent, TraceableDetailComponent]
})
export class TraceModule {}
