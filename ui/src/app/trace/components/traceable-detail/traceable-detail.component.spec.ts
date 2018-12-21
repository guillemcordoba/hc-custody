import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraceableDetailComponent } from './traceable-detail.component';

describe('TraceableDetailComponent', () => {
  let component: TraceableDetailComponent;
  let fixture: ComponentFixture<TraceableDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraceableDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraceableDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
