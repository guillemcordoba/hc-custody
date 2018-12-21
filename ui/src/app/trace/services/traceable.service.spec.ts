import { TestBed } from '@angular/core/testing';

import { TraceableService } from './traceable.service';

describe('TraceableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TraceableService = TestBed.get(TraceableService);
    expect(service).toBeTruthy();
  });
});
