import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraceablesComponent } from './traceables.component';

describe('TraceablesComponent', () => {
  let component: TraceablesComponent;
  let fixture: ComponentFixture<TraceablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraceablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraceablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
