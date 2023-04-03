import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionupdateComponent } from './promotionupdate.component';

describe('PromotionupdateComponent', () => {
  let component: PromotionupdateComponent;
  let fixture: ComponentFixture<PromotionupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionupdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
