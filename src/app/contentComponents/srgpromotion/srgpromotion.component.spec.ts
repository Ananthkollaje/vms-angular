import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NgChartsModule } from 'ng2-charts';

import { SrgpromotionComponent } from './srgpromotion.component';

describe('SrgpromotionComponent', () => {
  let component: SrgpromotionComponent;
  let fixture: ComponentFixture<SrgpromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, 
        FormsModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatCardModule,
        MatButtonModule,
        MatRadioModule,
        MatFormFieldModule,
        MatTableModule,
        MatPaginatorModule,
        MatCheckboxModule,
        NgChartsModule,
        MatDialogModule,
        MatExpansionModule,
        NoopAnimationsModule,],
      declarations: [ SrgpromotionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SrgpromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Total input form controls', () => {
    const formControlElements = fixture.debugElement.nativeElement.querySelector("#createPromotionForm");
    const inputElements = fixture.debugElement.queryAll(By.css('.text'));
      component.ngOnInit();
    expect(inputElements.length).toBe(11);
  });
});


