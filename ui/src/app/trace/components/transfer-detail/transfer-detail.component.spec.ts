import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferDetailComponent } from './transfer-detail.component';

describe('TransferDetailComponent', () => {
  let component: TransferDetailComponent;
  let fixture: ComponentFixture<TransferDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
