import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationStep3Page } from './registration-step3.page';

describe('RegistrationStep3Page', () => {
  let component: RegistrationStep3Page;
  let fixture: ComponentFixture<RegistrationStep3Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationStep3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
