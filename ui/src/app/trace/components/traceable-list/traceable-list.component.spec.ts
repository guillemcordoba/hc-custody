import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraceableListComponent } from './traceable-list.component';

describe('TraceableListComponent', () => {
  let component: TraceableListComponent;
  let fixture: ComponentFixture<TraceableListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraceableListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraceableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
