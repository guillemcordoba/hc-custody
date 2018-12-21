import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { TraceableEffects } from './traceable.effects';

describe('TraceableEffects', () => {
  let actions$: Observable<any>;
  let effects: TraceableEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TraceableEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(TraceableEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
