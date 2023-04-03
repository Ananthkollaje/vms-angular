import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VouchersearchComponent } from './vouchersearch.component';

describe('VouchersearchComponent', () => {
  let component: VouchersearchComponent;
  let fixture: ComponentFixture<VouchersearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VouchersearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VouchersearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
