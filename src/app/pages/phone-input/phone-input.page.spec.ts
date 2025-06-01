import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhoneInputPage } from './phone-input.page';

describe('PhoneInputPage', () => {
  let component: PhoneInputPage;
  let fixture: ComponentFixture<PhoneInputPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneInputPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
