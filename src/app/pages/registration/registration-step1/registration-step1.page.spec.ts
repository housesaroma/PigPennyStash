import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationStep1Page } from './registration-step1.page';

describe('RegistrationStep1Page', () => {
  let component: RegistrationStep1Page;
  let fixture: ComponentFixture<RegistrationStep1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationStep1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
